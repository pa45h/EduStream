const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/Courses.controller");

const {
  updateCourseProgress,
  getCourseProgress,
} = require("../controllers/CourseProgress.controller");

const {
  getAllCategories,
  categoryPageDetails,
} = require("../controllers/Categories.controller");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Sections.controller");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSections.controller");

const {
  createRating,
  getAverageRating,
  getAllRatings,
} = require("../controllers/RatingAndReview.controller");

const {
  auth,
  isStudent,
  isInstructor
} = require("../middlewares/auth.middleware");

// ==================== ROUTES FOR ALL: ====================

// Category Routes:
router.get("/getAllCategories", getAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);

// Course Routes:
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", getFullCourseDetails);

// Course Routes for course progress:
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.post("/getCourseProgress", auth, isStudent, getCourseProgress);

// Rating Review Routes:
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatings", getAllRatings);

// ==================== ROUTES FOR INSTRUCTOR: ====================

// Course Routes:
router.post("/createCourse", auth, isInstructor, createCourse);
router.put("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// Section Routes:
router.post("/createSection", auth, isInstructor, createSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.put("/updateSection", auth, isInstructor, updateSection);

// Sub - Section Routes:
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ==================== ROUTES FOR STUDENT: ====================
router.post("/createRating", auth, isStudent, createRating);

module.exports = router;
