const User = require("../models/User.model");
const mailSender = require("../utils/mailSender.util");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { resetPasswordMail } = require("../mail/passwordUpdate.mail");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email Is Not Registered!",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    await User.findOneAndUpdate(
      { email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Reset Password Link",
      resetPasswordMail(user.firstName, url)
    );

    res.status(200).json({
      success: true,
      message: "Reset Mail Sent Successfully, Please Check Your Mail!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message:
        "Cannot Generate Token For reset Password, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password felids Does Not Match!",
      });
    }

    const userData = await User.findOne({ token });

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token!",
      });
    }

    if (userData.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token Is expired, Please Try Again!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "User Cannot Reset Password, Please Try Again Later!",
      error: error.message,
    });
  }
};
