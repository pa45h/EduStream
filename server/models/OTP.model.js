const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.util");
const {emailVerification} = require("../mail/emailVerification.mail");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 5 * 60,
    },
  },
  { timestamps: true }
);

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email From EduStream",
      emailVerification(otp)
    );
    console.log("Email sent successfully", mailResponse.response);
  } catch (error) {
    console.log("Error occurred While Sending Verification Email!");
    console.error(error.message);
  }
}

otpSchema.pre("save", async function (next) {
  try {
    console.log("New document saved to the database");
    await sendVerificationEmail(this.email, this.otp);
    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    next(error);
  }
});

module.exports = mongoose.model("OTP", otpSchema);
