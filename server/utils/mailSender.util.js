const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    const info = await resend.emails.send({
      from: "EduStream <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    });
    console.log("✅ Email sent:", info);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error.message);
  }
};

module.exports = mailSender;
