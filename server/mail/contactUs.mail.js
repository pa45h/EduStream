exports.contactUsEmail = (firstname, lastname, email, message, phoneNo) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Contact Form Submission</title>
      <style>
          body {
              background-color: #0d1b2a;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #ffffff;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 30px;
              background-color: #1b263b;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          }
          .logo {
              max-width: 180px;
              margin-bottom: 20px;
          }
          .message {
              font-size: 20px;
              font-weight: bold;
              color: #ffffff;
              margin-bottom: 25px;
          }
          .body p {
              font-size: 16px;
              margin: 10px 0;
              color: #e0e1dd;
          }
          .highlight {
              font-weight: bold;
              color: #ffd60a;
          }
          .support {
              font-size: 14px;
              color: #a9b2c3;
              margin-top: 25px;
              text-align: center;
          }
          a {
              color: #ffd60a;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <a href="https://edustream-pa45h.vercel.app">
              <img class="logo" src="https://res.cloudinary.com/djf4s41kd/image/upload/v1758962539/Logo-Full-Light_yynpmn.png" alt="Logo">
          </a>
          <div class="message">📩 New Contact Form Submission</div>
          <div class="body">
              <p><span class="highlight">Name:</span> <span>${firstname} ${lastname}</span></p>
              <p><span class="highlight">Email:</span> <span>${email}</span></p>
              <p><span class="highlight">Phone no.:</span> <span>${phoneNo}</span></p>
              <p><span class="highlight">Message:</span></p>
              <p><span>${message}</span></p>
          </div>
          <div class="support">
              This message was sent from your website contact form.<br/>
              Please respond directly to the user’s email: 
              <a href="mailto:${email}">CLICK</a>
          </div>
      </div>
  </body>
  </html>`;
};

exports.contactThankYou = (name) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Thank You for Contacting Us</title>
      <style>
          body {
              background-color: #0d1b2a;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #ffffff;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 30px;
              background-color: #1b263b;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
              text-align: center;
          }
          .logo {
              max-width: 180px;
              margin-bottom: 20px;
          }
          .message {
              font-size: 20px;
              font-weight: bold;
              color: #ffffff;
              margin-bottom: 20px;
          }
          .body {
              font-size: 16px;
              margin-bottom: 25px;
              text-align: left;
              color: #e0e1dd;
          }
          .cta {
              display: inline-block;
              padding: 12px 25px;
              background-color: #ffd60a;
              color: #000000;
              text-decoration: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
              transition: background 0.3s ease;
          }
          .cta:hover {
              background-color: #ffc300;
          }
          .support {
              font-size: 14px;
              color: #a9b2c3;
              margin-top: 25px;
              text-align: center;
          }
          a {
              color: #ffd60a;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <a href="https://edustream-pa45h.vercel.app">
              <img class="logo" src="https://res.cloudinary.com/djf4s41kd/image/upload/v1758962539/Logo-Full-Light_yynpmn.png" alt="Logo">
          </a>
          <div class="message">✨ Thank You for Contacting Us</div>
          <div class="body">
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to us! We have received your message and our team will get back to you as soon as possible.</p>
              <p>In the meantime, feel free to explore more on our website.</p>
              <a class="cta" href="https://edustream-pa45h.vercel.app">Visit Website</a>
          </div>
          <div class="support">
              If you need immediate assistance, you can email us directly at 
              <a href="mailto:pa45h.katariya@gmail.com">CLICK</a>.
          </div>
      </div>
  </body>
  </html>`;
};
