// const nodemailer = require("nodemailer");
require("dotenv").config();
// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY);
import { CreateContact, ContactsApi } from "@getbrevo/brevo";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const CreateContactFunc = async (email) => {
  let contactAPI = new ContactsApi();
  contactAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

  let contact = new CreateContact();
  contact.email = email;

  contactAPI
    .createContact(contact)
    .then((res) => {
      console.log(JSON.stringify(res.body));
    })
    .catch((err) => {
      console.error("Error creating contact:", err.body);
    });
};

const mailSender = async (email, title, body) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });

    let emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_SMTP_PASSWORD;

    // const mailOptions = {
    //   from: `EduStream - Parth Katariya`,
    //   to: `${email}`,
    //   subject: `${title}`,
    //   html: `${body}`,
    // };

    let message = new SendSmtpEmail();
    message.subject = `${title}`;
    message.htmlContent = `${body}`;
    message.sender = {
      name: "EduStream - Parth Katariya",
      email: "pa45h.katariya@gmail.com",
    };
    message.to = [{ email: email }];

    const info = emailAPI.sendTransacEmail(message);

    // const transporter = nodemailer.createTransport({
    //   host: "smtp-relay.sendinblue.com", // Brevo SMTP Host
    //   port: 587, // Or 465 with secure: true
    //   secure: false, // Use TLS
    //   auth: {
    //     user: process.env.BREVO_SMTP_LOGIN, // Your Brevo Username
    //     pass: process.env.BREVO_SMTP_PASSWORD, // Your Brevo API Key/Password
    //   },
    // });

    // const info = await transporter.sendMail(mailOptions);

    // const info = await resend.emails.send(mailOptions);

    console.log("✅ Email sent:", info);
    return info;
  } catch (error) {
    console.error("❌ Mail sending failed:", error);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
