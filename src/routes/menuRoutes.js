const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const {
  addMenu,
  getTodayMenu,
} = require("../controllers/menuController");

const router = express.Router();

// Admin only
router.post("/", protect, isAdmin, addMenu);

// Student/Admin
router.get("/today", protect, getTodayMenu);

module.exports = router;
