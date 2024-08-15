
export const EmailTemplate = ({
    fullName,
    phoneNumber,
    email,
    country,
    message
}) => (
  <div>
   
    <div class="content">
      <h2 class="text-xl font-semibold">Contact Details</h2>
      <p><strong>Full Name:</strong> {{fullName}}</p>
      <p><strong>Phone Number:</strong> {{phoneNumber}}</p>
      <p><strong>Email:</strong> {{email}}</p>
      <p><strong>Country:</strong> {{country}}</p>
      <p><strong>Message:</strong></p>
      <p>{{message}}</p>
    </div>
    <div class="footer">
      <p class="text-sm">This email is sent from AtlanticLubes contact form.</p>
    </div>
  </div>
);
