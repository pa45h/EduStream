exports.resetPasswordMail = (name, url) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Reset Password Link</title>
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
          .cta {
              display: inline-block;
              padding: 12px 24px;
              background-color: #ffd60a;
              color: #000000;
              text-decoration: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
              transition: background-color 0.3s ease;
          }
          .cta:hover {
              background-color: #ffcd00;
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
          <div class="message">🔑 Password Reset Request</div>
          <div class="body">
              <p>Hello ${name},</p>
              <p>We received a request to reset your password. Please click the button below to set a new password:</p>
              <p style="text-align:center;"><a class="cta" href="${url}">Reset Password</a></p>
              <p>If you did not request this, please ignore this email. This link will expire in <strong>15 minutes</strong> for security reasons.</p>
          </div>
          <div class="support">
              Need help? Email us at <a href="mailto:pa45h.katariya@gmail.com">pa45h.katariya@gmail.com</a>.
          </div>
      </div>
  </body>
  </html>`;
};

exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Password Update Confirmation</title>
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
          <div class="message">🔒 Password Update Confirmation</div>
          <div class="body">
              <p>Hey ${name},</p>
              <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.</p>
              <p>If you did not request this change, please contact us immediately to secure your account.</p>
          </div>
          <div class="support">
              Need help? Email us at <a href="mailto:pa45h.katariya@gmail.com">pa45h.katariya@gmail.com</a>.
          </div>
      </div>
  </body>
  </html>`;
};
