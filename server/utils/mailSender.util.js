const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `EduStream - Parth Katariya <pa45h.katariya@gmail.com>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
