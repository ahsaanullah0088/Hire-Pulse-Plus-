import express from "express";
import { getAllBlogs, getBlogById, getLimitedBlogs, createBlog } from "../controllers/blogController.js";

const router = express.Router();

// Limited blogs for home page
router.get("/limited", getLimitedBlogs);

// Get single blog by ID
router.get("/:id", getBlogById);

// Get all blogs
router.get("/", getAllBlogs);

// Create blog (admin)
router.post("/", createBlog);

export default router;
