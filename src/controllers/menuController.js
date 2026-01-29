const Menu = require("../models/Menu");

// Admin: Add or Update menu (ONE menu per date)
exports.addMenu = async (req, res) => {
  try {
    const { date, breakfast, lunch, dinner } = req.body;

    if (!date || !breakfast || !lunch || !dinner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const menu = await Menu.findOneAndUpdate(
      { date },
      {
        date,
        breakfast,
        lunch,
        dinner,
        createdBy: req.user._id,
      },
      { new: true, upsert: true } // 🔥 key upgrade
    );

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Student/Admin: Get today’s menu
exports.getTodayMenu = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const menu = await Menu.findOne({ date: today });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found for today" });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
