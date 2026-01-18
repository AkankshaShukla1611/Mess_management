const Menu = require("../models/Menu");

// Admin: Add menu
exports.addMenu = async (req, res) => {
  try {
    const menu = await Menu.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Student/Admin: Get today’s menu
exports.getTodayMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
