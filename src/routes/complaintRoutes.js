const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintSummary,
} = require("../controllers/complaintController");

const router = express.Router();

// Student
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, isAdmin, getAllComplaints);
router.put("/:id/status", protect, isAdmin, updateComplaintStatus);

// Admin dashboard summary
router.get("/summary", protect, isAdmin, getComplaintSummary);


module.exports = router;
