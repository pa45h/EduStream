const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing!",
      });
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Token verification!",
      error: error.message,
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "student") {
      return res.status(401).json({
        success: false,
        message: "This Is The Authorized Route For Student Only!",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Student Authorization!",
      error: error.message,
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType != "instructor") {
      return res.status(401).json({
        success: false,
        message: "This Is The Authorized Route For Instructor Only!",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Instructor Authorization!",
      error: error.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType != "admin") {
      return res.status(401).json({
        success: false,
        message: "This Is The Authorized Route For Admin Only!",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Admin Authorization!",
      error: error.message,
    });
  }
};
