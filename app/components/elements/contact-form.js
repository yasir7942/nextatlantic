'use client';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCaptchaCode, setIsCaptchaCode] = useState('');

  // inline status banner
  const [statusMessage, setStatusMessage] = useState('');
  const [statusVariant, setStatusVariant] = useState(''); // 'success' | 'error' | ''

  const recaptchaRef = useRef(null);
  const formRef = useRef(null);

  // Single toast ID so we never stack multiple
  const TOAST_ID = 'contact-status';

  const renderToast = (variant, text) => {
    const isLoading = variant === 'loading';
    const isSuccess = variant === 'success';

    return toast.custom(
      (t) => (
        <div
          className={`w-full max-w-2xl mx-auto rounded-xl border p-4 shadow-lg
          ${isLoading ? 'border-white/20 bg-white/5 text-gray-200'
              : isSuccess ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-200'}`}
          role="status"
          aria-live="polite"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-3">
            {isLoading ? (
              <span className="mt-0.5 h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <span className={`mt-1 h-2.5 w-2.5 rounded-full ${isSuccess ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            )}
            <p className="text-sm leading-relaxed grow">{text}</p>

            {!isLoading && (
              <button
                type="button" // not a submit
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toast.dismiss(TOAST_ID);
                }}
                className="ml-3 inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium
                           border border-white/20 hover:bg-white/10 transition"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      ),
      { id: TOAST_ID, duration: Infinity } // persistent until Dismiss
    );
  };

  const showLoadingToast = (msg) => renderToast('loading', msg);
  const showSuccessToast = (msg) => renderToast('success', msg);
  const showErrorToast = (msg) => renderToast('error', msg);

  const setBanner = (variant, msg) => {
    setStatusVariant(variant); // 'success' or 'error'
    setStatusMessage(msg);
  };

  const clearBanner = () => {
    setStatusVariant('');
    setStatusMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear old banner on new submit
    clearBanner();

    // Early validation: don't show loading if captcha missing
    if (!isCaptchaCode) {
      const msg = 'reCAPTCHA is required. Please verify and try again.';
      setBanner('error', msg);
      showErrorToast(msg);
      return;
    }

    setIsSubmitting(true);
    showLoadingToast('Sending…');

    try {
      // Timeout guard (20s)
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);

      const res = await fetch('/api/send', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_API_KEY}`,
        },
        body: JSON.stringify({ fullName, phoneNumber, email, country, message, isCaptchaCode }),
      }).finally(() => clearTimeout(timer));

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Send failed');
      }

      // Reset form & captcha
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setCountry('');
      setMessage('');
      setIsCaptchaCode('');
      formRef.current?.reset();
      recaptchaRef.current?.reset();

      // Toast + Banner success
      const successMsg = 'Email sent successfully!';
      showSuccessToast(successMsg);
      setBanner('success', successMsg);
    } catch (err) {
      // Toast + Banner error
      const errMsg =
        err && err.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : 'Failed to send email: System Error — please email us directly.';
      showErrorToast(errMsg);
      setBanner('error', errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onReCAPTCHAChange = (code) => {
    if (!code) return; // expired
    setIsCaptchaCode(code);
  };

  // banner classes (success/error)
  const bannerClasses =
    statusVariant === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
      : statusVariant === 'error'
        ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
        : '';

  return (
    <div className="md:mt-10">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="fullName">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="phoneNumber">Phone</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Valid phone number"
              required
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="country">Country</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Your country"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="message">Message</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows={4}
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <small className="error text-gray-300 font-light">
            Please avoid including hyperlinks or URLs in your message.
          </small>
        </div>

        <div className="mb-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            theme="dark"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isSubmitting}
            className="font-medium text-lg bg-transparent border border-white hover:bg-gray-50 transition duration-150 text-white hover:text-gray-800 py-2 px-12 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </div>

        {/* Toast right under the button */}
        <div className="pt-4">
          <Toaster
            position="bottom-left"   // adjust as you prefer
            gutter={12}
            toastOptions={{ duration: Infinity }} // lifetime via Dismiss
          />
        </div>

        {/* Inline status banner (text) right under the toast area */}
        {statusMessage && statusVariant && (
          <div className={`mt-3 rounded-xl border p-4 ${bannerClasses}`}>
            <p className="text-sm leading-relaxed">{statusMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
