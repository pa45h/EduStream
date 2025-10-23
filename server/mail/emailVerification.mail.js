exports.emailVerification = (otp) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>OTP Verification Email</title>
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
              color: #e0e1dd;
              text-align: left;
          }
          .highlight {
              font-weight: bold;
              color: #ffd60a;
              font-size: 24px;
          }
          .support {
              font-size: 14px;
              color: #a9b2c3;
              margin-top: 25px;
          }
          a {
              color: #ffd60a;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <a href="">
              <img class="logo" src="https://res.cloudinary.com/djf4s41kd/image/upload/v1758962539/Logo-Full-Light_yynpmn.png" alt="Logo">
          </a>
          <div class="message">🔑 OTP Verification</div>
          <div class="body">
              <p>Dear User,</p>
              <p>Thank you for registering with EduStream. To complete your registration, please use the following OTP:</p>
              <h2 class="highlight">${otp}</h2>
              <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
          </div>
          <div class="support">
              For help, reach out to <a href="mailto:pa45h.katariya@gmail.com">pa45h.katariya@gmail.com</a>.
          </div>
      </div>
  </body>
  </html>`;
};
