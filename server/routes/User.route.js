const express = require("express");
const router = express.Router();

const {
  sendOtp,
  signUp,
  login,
  changePassword,
  googleSignup,
} = require("../controllers/Auth.controller");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword.controller");

const { auth } = require("../middlewares/auth.middleware");

router.post("/sendotp", sendOtp);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/googleSignup", googleSignup);

router.post("/changePassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
