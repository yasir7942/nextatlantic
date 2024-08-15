'use client';
import { useState } from 'react';

const ContactForm= () => {

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_API_KEY}`, // API key for authorization
        },
        body: JSON.stringify({ fullName, phoneNumber, email, country, message }),
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        const result = await response.json();
        console.log(result.error);
        setStatus(`Failed to send email: ${ 'System Error Email Us'}`);
      }
    } catch (error) {
        console.log("email error 2 ");
        console.log(error);
      setStatus(`Failed to send email: System Error Email Us`);
    } finally {
      // Finish the submission process
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form   onSubmit={handleSubmit}>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block text-white text-sm font-semibold mb-2  " htmlFor="name">Name</label>
                                    <input
                                        className="shadow appearance-none border  rounded w-full py-2 px-3  tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="phone">Phone</label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3  tracking-wide text-white bg-transparent font-light font-lightleading-tight focus:outline-none focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Your phone number"
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3  tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3  tracking-wide text-white bg-transparent font-light leading-tight focus:outline-none focus:shadow-outline"
                                    id="message"
                                    rows="4"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button disabled={isSubmitting}
                                    className="font-medium text-lg bg-transparent border border-spacing-1 border-white hover:bg-gray-50 transition duration-150 text-white hover:text-gray-800  py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>

                            {status && <p className='pt-5 text-[#A81B1A]'>{status}</p>}
                        </form>

    </div>
  )
}

export default ContactForm
