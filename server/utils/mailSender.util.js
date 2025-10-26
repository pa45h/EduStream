const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: {
        name: "EduStream - Parth Katariya",
        address: process.env.MAIL_USER,
      },
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error);
    return;
  }
};

module.exports = mailSender;
