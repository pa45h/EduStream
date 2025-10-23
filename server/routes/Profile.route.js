const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  fetchInstructorDashboardData,
} = require("../controllers/Profile.controller");

const {
  auth,
  isStudent,
  isInstructor,
} = require("../middlewares/auth.middleware");

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
router.get(
  "/fetchInstructorDashboardData",
  auth,
  isInstructor,
  fetchInstructorDashboardData
);

module.exports = router;
