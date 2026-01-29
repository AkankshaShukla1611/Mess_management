const User = require("../models/User");
const bcrypt = require("bcryptjs"); // ✅ FIXED
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
// LOGIN
exports.login = async (req, res) => {
  try {
    // console.log("LOGIN BODY:", req.body); // 👈 LOG 1

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // console.log("USER FROM DB:", user); // 👈 LOG 2

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // console.log("HASHED PASSWORD:", user.password); // 👈 LOG 3

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("PASSWORD MATCH:", isMatch); // 👈 LOG 4

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
