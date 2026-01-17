const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  addFeedback,
  getMyFeedback,
  getAllFeedback,
  getFeedbackStats,
} = require("../controllers/feedbackController");

const router = express.Router();

// Student
router.post("/", protect, addFeedback);
router.get("/my", protect, getMyFeedback);

// Admin
router.get("/", protect, isAdmin, getAllFeedback);
router.get("/stats", protect, isAdmin, getFeedbackStats);

module.exports = router;
