const OTP = require("../models/OTP.model");
const User = require("../models/User.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile.model");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender.util");
const { passwordUpdated } = require("../mail/passwordUpdate.mail");
require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserRegistered = await User.findOne({ email });

    if (isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered!",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Generated OTP: ", otp);

    let isOtp = await OTP.findOne({ otp });

    while (isOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      isOtp = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully!",
      OTP: otpBody,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error While Sending OTP!",
      error: error.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNo,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter All Fields Properly!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Value Does Not Match, Please Try Again!",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered!",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOtp : ", recentOtp);

    if (!recentOtp.length) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found!",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = accountType === "instructor" ? false : true;

    const profileData = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNo: null,
    });

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNo,
      additionalDetails: profileData._id,
      approved: approved,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}_${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: " User Registered Successfully!",
      userData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "User Could Not Registered, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter All Fields Properly!",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Is Not Registered, please Sign Up First!",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user.token = token;
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, option).status(200).json({
        success: true,
        user,
        token,
        message: "User Logged In Successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect Password!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "User Could Not Log In, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter All Fields Properly!",
      });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const payload = {
        id: "EduStreamAdminId",
        email: email,
        accountType: "admin",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const option = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res
        .cookie("token", token, option)
        .status(200)
        .json({
          success: true,
          user: {
            firstName: "EduStream",
            lastName: "Admin",
            email,
            accountType: "admin",
            image:
              "https://api.dicebear.com/5.x/initials/svg?seed=EduStream_Admin",
          },
          token,
          message: "Admin Logged In Successfully!",
        });
    } else {
      res.status(400).json({
        success: false,
        message: "Wrong Admin Credentials!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Admin Could Not Log In, Please Try Again Later!",
      error: error.message,
    });
  }
};

exports.googleSignup = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("ticket---", ticket);

    const payload = ticket.getPayload();
    console.log("payload---", payload);

    const { email, name, picture, given_name, family_name } = payload;

    let user = await User.findOne({ email: email }).populate(
      "additionalDetails"
    );

    if (!user) {
      const profileData = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNo: null,
      });

      user = await User.create({
        firstName: given_name,
        lastName: family_name || "",
        email: email,
        googleId: payload.sub,
        accountType: "student",
        additionalDetails: profileData._id,
        approved: true,
        image: picture,
      });
    }

    const appTokenPayload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const appToken = jwt.sign(appTokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.token = appToken;
    user.password = undefined;

    const option = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", appToken, option).status(200).json({
      success: true,
      user,
      token: appToken,
      message: "User Logged In Successfully!",
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR............", error);
    return res.status(500).json({
      success: false,
      message: "Google Sign-In failed. Please try again.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter All Fields Properly!",
      });
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password!",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    try {
      const emailResponse = await mailSender(
        user.email,
        `Password Updated Successfully for ${user.firstName} ${user.lastName}`,
        passwordUpdated(user.email, user.firstName)
      );
      console.log("Email Sent Successfully! :- ", emailResponse);
    } catch (error) {
      console.log("Error Occurred While Sending Email: ", error);
      return res.status(500).json({
        success: false,
        message: "Error Occurred While Sending Email",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: "Password Changed Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "User Could Not Change Password, Please Try Again Later!",
      error: error.message,
    });
  }
};
