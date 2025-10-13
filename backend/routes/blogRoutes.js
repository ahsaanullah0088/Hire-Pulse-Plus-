import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, upload.single("image"), createBlog);

export default router;
