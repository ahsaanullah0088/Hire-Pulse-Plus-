import Blog from "../models/Blog.js";
import cloudinary from "../utils/cloudinary.js";

// @desc Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, shortDescription, longDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // ✅ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    // ✅ Save blog with Cloudinary URL
    const blog = await Blog.create({
      title,
      image: result.secure_url, // Cloudinary image URL
      shortDescription,
      longDescription,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
