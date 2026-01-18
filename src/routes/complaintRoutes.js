const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintSummary,
} = require("../controllers/complaintController");


// Admin dashboard summary
router.get("/summary", protect, isAdmin, getComplaintSummary);

// Student
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, isAdmin, getAllComplaints);
router.put("/:id/status", protect, isAdmin, updateComplaintStatus);




module.exports = router;
