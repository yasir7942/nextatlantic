'use client';

import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

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
  const [captchaError, setCaptchaError] = useState('');   // show inline captcha error

  const recaptchaRef = useRef(null);
  const formRef = useRef(null);

  const setBanner = (variant, msg) => {
    setStatusVariant(variant);
    setStatusMessage(msg);
  };

  const clearBanner = () => {
    setStatusVariant('');
    setStatusMessage('');
  };

  const resetCaptcha = () => {
    recaptchaRef.current?.reset?.();
    setIsCaptchaCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearBanner();
    setCaptchaError(''); // clear previous captcha error

    // Manual validity to allow captcha reset on invalid forms
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // show native messages
      resetCaptcha();                   // reset because form had errors
      setBanner('error', 'Please correct the highlighted fields and try again.');
      return;
    }

    // Captcha required (client-side)
    if (!isCaptchaCode) {
      const msg = 'Please complete the reCAPTCHA.';
      setCaptchaError(msg);
      setBanner('error', msg);
      return;
    }

    setIsSubmitting(true);

    try {
      // Timeout guard (20s)
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);

      const res = await fetch('/api/send', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          // MUST equal server CONTACT_API_KEY
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTACT_API_KEY}`,
        },
        body: JSON.stringify({ fullName, phoneNumber, email, country, message, isCaptchaCode }),
      }).finally(() => clearTimeout(timer));

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const serverMsg =
          data?.error ||
          data?.message ||
          (res.status === 401
            ? 'Unauthorized (invalid API key).'
            : res.status === 400
              ? 'Bad request. Please check your inputs.'
              : 'Failed to send email.');
        throw new Error(serverMsg);
      }

      // Reset form & captcha on success
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setCountry('');
      setMessage('');
      formRef.current?.reset?.();
      resetCaptcha();

      setBanner('success', 'Email sent successfully!');
    } catch (err) {
      // Any server/network error -> require a fresh captcha solve
      resetCaptcha();

      const errMsg =
        err?.name === 'AbortError'
          ? 'Request timed out. Please try again.'
          : err?.message || 'Failed to send email: System Error — please email us directly.';
      setBanner('error', errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onReCAPTCHAChange = (code) => {
    // Google sends null on expiry
    if (!code) {
      setCaptchaError('reCAPTCHA expired. Please verify again.');
      setIsCaptchaCode('');
      return;
    }
    setCaptchaError('');
    setIsCaptchaCode(code);
  };

  const bannerClasses =
    statusVariant === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
      : statusVariant === 'error'
        ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
        : '';

  return (
    <div className="md:mt-10">
      {/* Use noValidate so we can intercept validity and reset captcha when invalid */}
      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-live="polite">
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="fullName">
              Name
            </label>
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
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="phoneNumber">
              Phone
            </label>
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
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
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
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="country">
              Country
            </label>
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
          <label className="block text-white text-sm font-semibold mb-2" htmlFor="message">
            Message
          </label>
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

        <div className="mb-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            theme="dark"
          />
          {/* Inline captcha error */}
          {captchaError ? (
            <p className="mt-1 text-sm text-rose-300">{captchaError}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            disabled={isSubmitting}
            className="font-medium text-lg bg-transparent border border-white hover:bg-gray-50 transition duration-150 text-white hover:text-gray-800 py-2 px-12 rounded focus:outline-none focus:shadow-outline disabled:opacity-60"
            type="submit"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </div>

        {/* Inline status banner */}
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
