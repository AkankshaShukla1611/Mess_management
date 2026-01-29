const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@gmail.com" },
      { password: hashedPassword, role: "admin" },
      { new: true }
    );

    if (!admin) {
      console.log("❌ Admin not found in mess_management DB");
    } else {
      console.log("✅ Admin password reset for:", admin.email);
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetAdminPassword();
