import { EmailTemplate } from '@/app/components/elements/email-template';
import { getContactUsPage } from '@/app/data/loader';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Normalize hostnames (strip protocol + "www.")
const normalizeHost = (h) =>
    (h || '')
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .trim();

// Allow multiple hostnames via env, e.g. "atlanticlubesjamaica.com,www.atlanticlubesjamaica.com,localhost"
const ALLOWED_HOSTS = (process.env.CONTACT_ALLOWED_HOSTNAMES || process.env.NEXT_PUBLIC_SITE || '')
    .split(',')
    .map(normalizeHost)
    .filter(Boolean);

export async function POST(request) {
    // 1) Validate required env config
    const missing = [];
    if (!process.env.CONTACT_API_KEY) missing.push('CONTACT_API_KEY');
    if (!process.env.RESEND_API_KEY) missing.push('RESEND_API_KEY');
    if (!process.env.RECAPTCHA_SECRET_KEY) missing.push('RECAPTCHA_SECRET_KEY');
    if (ALLOWED_HOSTS.length === 0) missing.push('CONTACT_ALLOWED_HOSTNAMES (or NEXT_PUBLIC_SITE)');
    if (missing.length) {
        console.error('[CONTACT] Missing env vars:', missing.join(', '));
        return new Response(
            JSON.stringify({
                error: 'Server configuration error. Missing environment variables.',
                details: missing,
            }),
            { status: 500 }
        );
    }

    // 2) Auth check
    const auth = request.headers.get('Authorization') || '';
    const expected = `Bearer ${process.env.CONTACT_API_KEY}`;
    if (auth !== expected) {
        return new Response(JSON.stringify({ error: 'Unauthorized (invalid API key).' }), { status: 401 });
    }

    // 3) Parse & validate body
    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), { status: 400 });
    }

    const { fullName, phoneNumber, email, country, message, isCaptchaCode } = body || {};
    if (!fullName || !phoneNumber || !email || !country || !message || !isCaptchaCode) {
        return new Response(JSON.stringify({ error: 'Invalid input or missing values.' }), { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+|href\s*=\s*["'][^\s]+["']/i;
    const spamWords = ['crypto', 'win prize', 'free money', 'investment', 'click here', 'grils', 'girl', 'https', 'http', 'href'];

    if (!emailPattern.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
    }
    if (urlPattern.test(message)) {
        return new Response(JSON.stringify({ error: 'Message contains a URL, which is not allowed.' }), { status: 400 });
    }
    if (spamWords.some((w) => String(message).toLowerCase().includes(w.toLowerCase()))) {
        return new Response(JSON.stringify({ error: 'Message contains spammy or unwanted words.' }), { status: 400 });
    }

    // 4) reCAPTCHA verify (proper form POST + diagnostics)
    try {
        const params = new URLSearchParams();
        params.append('secret', process.env.RECAPTCHA_SECRET_KEY);
        params.append('response', isCaptchaCode);

        // Optional: forward client IP for extra trust signal
        const clientIp =
            (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            '';
        if (clientIp) params.append('remoteip', clientIp);

        const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: params.toString(),
        });

        const captcha = await resp.json();

        // Server-side diagnostics (not sent to client)
        console.log('[reCAPTCHA] Raw response:', captcha);

        const success = !!captcha?.success;
        const host = normalizeHost(captcha?.hostname);
        const hostAllowed = ALLOWED_HOSTS.includes(host);

        if (!success) {
            return new Response(
                JSON.stringify({
                    error: 'reCAPTCHA verification failed.',
                    hint: 'Token rejected by Google. See error codes.',
                    'error-codes': captcha?.['error-codes'] || [],
                }),
                { status: 400 }
            );
        }

        if (!hostAllowed) {
            return new Response(
                JSON.stringify({
                    error: 'reCAPTCHA hostname mismatch.',
                    expectedAnyOf: ALLOWED_HOSTS,
                    got: host || '(empty)',
                    hint:
                        'Ensure your reCAPTCHA site key is bound to the correct domain(s). Watch out for "www" vs apex and no protocol.',
                }),
                { status: 400 }
            );
        }

        // 5) Load email config & send
        const ContactPageData = await getContactUsPage();
        const toEmail = ContactPageData?.receiverTo?.trim();
        // const replyTo = ContactPageData?.replyTo?.trim();
        const fromEmail = ContactPageData?.fromEmail?.trim();
        const ccEmail = ContactPageData?.receiverCC?.trim();
        const bccEmail = ContactPageData?.receiverBCC?.trim();
        const emailSubject = (ContactPageData?.contactFormSubject?.trim() || 'Contact Form') + ' ' + fullName;

        if (!toEmail || !fromEmail) {
            return new Response(
                JSON.stringify({ error: 'Email routing misconfigured. Missing toEmail or fromEmail.' }),
                { status: 500 }
            );
        }

        const payload = {
            from: fromEmail,
            to: [toEmail],
            subject: emailSubject,
            replyTo: email,
            react: EmailTemplate({
                name: fullName,
                phone: phoneNumber,
                mail: email,
                contry: country, // keep as-is if your template expects this prop
                msg: message,
            }),
        };
        if (ccEmail) payload.cc = [ccEmail];
        if (bccEmail) payload.bcc = [bccEmail];

        // console.log('[RESEND] Sending email with payload:', payload);    // for troubleshotting

        const { error } = await resend.emails.send(payload);
        if (error) {
            console.error('[RESEND] Error:', error);
            return new Response(JSON.stringify({ error: 'Email provider error. Please try again later.' }), { status: 502 });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
    } catch (err) {
        console.error('[CONTACT] Unexpected server error:', err);
        return new Response(JSON.stringify({ error: 'Unexpected server error.' }), { status: 500 });
    }
}
