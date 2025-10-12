import express from "express";
import { createJob, getAllJobs, getJobById , updateJob , deleteJob } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Admin-only Route
router.post("/", protect, createJob);
// Admin-only Routes
router.put("/:id", protect, updateJob);   // Update job
router.delete("/:id", protect, deleteJob); // Delete job


export default router;
