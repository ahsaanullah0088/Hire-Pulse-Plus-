import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Admin Register (only you can register, since email checked via .env)
router.post("/register", registerAdmin);

// Admin Login
router.post("/login", loginAdmin);

export default router;
