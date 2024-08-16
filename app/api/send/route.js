import { EmailTemplate } from '@/app/components/elements/email-template';


import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    // Check for API key in headers
    const apiKey = request.headers.get('Authorization') + '7JtBCBL777KkUJp';

    if (apiKey !== `Bearer ${process.env.CONTACT_API_KEY}`) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }


    const { fullName, phoneNumber, email, country, message } = await request.json();
    console.log("fullname=" + fullName + "-phone:" + phoneNumber + "-email:" + email + "-country:" + country + "-msg:" + message);
    // Validate input data
    if (!fullName || !phoneNumber || !email || !country || !message) {
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
       const spamWords = ['crypto', 'win prize', 'free money', 'investment', 'click here', 'grils' , 'girl', 'https', 'http','href'];
   
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
        const { data, error } = await resend.emails.send({
            from: 'AGL Site <website@atlanticlubes.com>',
            to: ['it@atlanticlubes.com'],
            subject: 'AGL Contact Form - ' + fullName,
            react: EmailTemplate({
                name: fullName,
                phone: phoneNumber,
                mail: email,
                contry: country,
                msg: message
            })
        });

        if (error) {
            console.log("api error 1");
            return Response.json({ error }, { status: 500 });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
    } catch (error) {
        console.log("api error 2");
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
