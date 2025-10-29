const nodemailer = require("nodemailer");
require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });

    const mailOptions = {
      from: `EduStream - Parth Katariya <onboarding@resend.dev>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    };

    // const info = await transporter.sendMail(mailOptions);

    const info = await resend.emails.send(mailOptions);

    console.log("✅ Email sent:", info);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
