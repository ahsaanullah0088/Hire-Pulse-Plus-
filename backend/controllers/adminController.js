import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc Admin Register (only for setup, can be disabled later)
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // only allow email from .env
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are not authorized to register" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password });
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Check if email matches the one in .env
    if (email !== process.env.ADMIN_EMAIL)
      return res.status(403).json({ message: "Unauthorized admin" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
