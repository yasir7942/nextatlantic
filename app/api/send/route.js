import { EmailTemplate } from '@/app/components/elements/email-template';
import { getContactUsPage } from '@/app/data/loader';
import fetch from "node-fetch";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    // Check for API key in headers
    const apiKey = request.headers.get('Authorization') + '7JtBCBL777KkUJp';

    if (apiKey !== `Bearer ${process.env.CONTACT_API_KEY}`) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }


    const { fullName, phoneNumber, email, country, message, isCaptchaCode } = await request.json();



    // Validate input data
    if (!fullName || !phoneNumber || !email || !country || !message || !isCaptchaCode) {
        return new Response(JSON.stringify({ error: 'Invalid input or Missing Values' }), { status: 400 });
    }



    // Regular expression to detect URLs
    const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+|href\s*=\s*["'][^\s]+["']/i;

    // Regular expression to validate email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to validate email addresses
    const isValidEmail = email => emailPattern.test(email);


    // Function to check for URLs
    const containsUrl = message => urlPattern.test(message);

    // List of spammy or unwanted words
    const spamWords = ['crypto', 'win prize', 'free money', 'investment', 'click here', 'grils', 'girl', 'https', 'http', 'href'];

    // Function to check for spammy words
    const containsSpam = message => spamWords.some(word => message.toLowerCase().includes(word.toLowerCase()));

    if (!isValidEmail(email)) {  // Check if the email is valid
        return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
    }

    if (containsUrl(message)) {  // Check if the message contains a URL
        console.log("Message contains a URL, which is not allowed");
        return new Response(JSON.stringify({ error: 'Message contains a URL, which is not allowed.' }), { status: 400 });
    }

    if (containsSpam(message)) {  // Check if the message contains spammy words
        console.log("Message contains spammy or unwanted words.");
        return new Response(JSON.stringify({ error: 'Message contains spammy or unwanted words.' }), { status: 400 });
    }



    try {

        //Captcha validation
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${isCaptchaCode}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                method: "POST",
            }
        );
        const captchaValidation = await response.json();



        if (captchaValidation.success && process.env.NEXT_PUBLIC_SITE == captchaValidation.hostname) {




            const ContactPageData = await getContactUsPage();
            const toEmail = ContactPageData?.formReceiverTo?.trim();
            const fromEmail = ContactPageData?.fromEmail?.trim();
            const ccEmail = ContactPageData?.formReceiverCC?.trim();
            const bccEmail = ContactPageData?.formReceiverBCC?.trim();
            const emailSubject = ContactPageData?.contactFormSubject?.trim() ?? "Contact Form";
            const fromHeader = `Email Sender <${fromEmail}>`;

            if (!toEmail && !fromEmail) {
                return new Response(JSON.stringify({ error: 'No receiver configured (formReceiverTo or fromEmail).' }), { status: 500 });
            }

            /*  const { data, error } = await resend.emails.send({
                  from: 'AGL Site <website@atlanticlubes.com>',
                  to: [ContactPageData.formReceiverTo],   //always  single email 
  
  
                  subject: ContactPageData.contactFormSubject + ' ' + fullName,
                  react: EmailTemplate({
                      name: fullName,
                      phone: phoneNumber,
                      mail: email,
                      contry: country,
                      msg: message
                  })
              });   */


            const payload = {
                from: fromHeader,
                to: [toEmail], // always single email (still needs to be an array/string)
                subject: `${emailSubject}  ${fullName}`,
                // Optional but handy so replies go to the submitter:
                replyTo: email,
                react: EmailTemplate({
                    name: fullName,
                    phone: phoneNumber,
                    mail: email,
                    contry: country, // keep your existing prop name if the template expects it
                    msg: message,
                }),
                ...(ccEmail ? { cc: [ccEmail] } : {}), // add only if exists
                ...(bccEmail ? { bcc: [bccEmail] } : {}), // add only if exists
            };

            const { data, error } = await resend.emails.send(payload);

            if (error) {
                console.log("Send API Error");
                return Response.json({ error }, { status: 500 });
            }

            return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
        }


        return new Response(JSON.stringify({ message: 'Error In Google Captcha!' }), { status: 500 });



    } catch (error) {
        console.log("api error 2");
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
