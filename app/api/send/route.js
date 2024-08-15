import { EmailTemplate } from '@/app/components/elements/email-template';
 
 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

        // Check for API key in headers
        const apiKey = request.headers.get('Authorization');

        if (apiKey !== `Bearer ${process.env.NEXT_PUBLIC_CONTACT_API_KEY}`) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
          }


    const { fullName, phoneNumber, email, country, message } = await request.json();

    // Validate input data
    if (!fullName || !phoneNumber || !email || !country || !message) {
        return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
      }


  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: ['it@atlanticlubes.com'],
      subject: 'ATL Contact Form- ' + fullName,
      react: EmailTemplate({ name: fullName , phonenumber: phone,
        mail: email,
        country: country,
        message: message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  } 
}
