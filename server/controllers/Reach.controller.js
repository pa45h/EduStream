const { contactUsEmail, contactThankYou } = require("../mail/contactUs.mail");
const mailSender = require("../utils/mailSender.util");

exports.contact = async (req, res) => {
  try {
    const { email, firstname, lastname, phoneNo, message } = req.body;

    if (!email || !firstname || !lastname || !phoneNo || !message) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "All Feilds Are Required!",
      });
    }

    const contactUsEmailResponse = await mailSender(
      process.env.MAIL_USER,
      `Contact Form Submission From ${firstname} ${lastname}`,
      contactUsEmail(firstname, lastname, email, message, phoneNo)
    );

    const contactThankYouEmailResponse = await mailSender(
      email,
      `Thank You for Contacting Us!`,
      contactThankYou(firstname)
    );

    return res.status(200).json({
      success: true,
      contactUsEmailResponse,
      contactThankYouEmailResponse,
      message: "Contact Mail Sent Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Could Not Sent Contact Us Mail!",
    });
  }
};
