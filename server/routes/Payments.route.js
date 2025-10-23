const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendEmailSuccessEmail,
} = require("../controllers/Payments.controllers");

const { auth, isStudent } = require("../middlewares/auth.middleware");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendEmailSuccessEmail", auth, isStudent, sendEmailSuccessEmail);

module.exports = router;
