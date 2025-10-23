const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
} = require("../controllers/Categories.controller");
const { auth, isAdmin } = require("../middlewares/auth.middleware");
const { adminLogin } = require("../controllers/Auth.controller");
const {
  fetchAllData,
  updateInstructorApproval,
} = require("../controllers/Profile.controller");

// ==================== ROUTES FOR ADMIN: ====================
router.post("/adminLogin", adminLogin);
router.get("/fetchAllData", auth, isAdmin, fetchAllData);
router.post(
  "/update-instructor-approval",
  auth,
  isAdmin,
  updateInstructorApproval
);
router.post("/createCategory", auth, isAdmin, createCategory);
router.delete("/deleteCategory/:categoryId", auth, isAdmin, deleteCategory);

module.exports = router;
