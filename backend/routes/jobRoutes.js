import express from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Admin-only Route
router.post("/", protect, createJob);

export default router;
