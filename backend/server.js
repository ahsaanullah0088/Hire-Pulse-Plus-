import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// // Routes (we’ll add later)
// import blogRoutes from "./routes/blogRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// app.use("/api/blogs", blogRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/admin", adminRoutes);

// Root
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
