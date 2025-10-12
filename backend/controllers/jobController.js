import Job from "../models/Job.js";

// @desc Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, hrEmail, applyLink, description } = req.body;

    const job = await Job.create({
      title,
      hrEmail,
      applyLink,
      description,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const searchQuery = req.query.search || ""; // ?search=frontend
    let jobs;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // case-insensitive
      jobs = await Job.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { company: { $regex: regex } }
        ]
      }).sort({ createdAt: -1 });
    } else {
      jobs = await Job.find().sort({ createdAt: -1 });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a job
export const updateJob = async (req, res) => {
  try {
    const { title, hrEmail, applyLink, description } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Update fields
    job.title = title || job.title;
    job.hrEmail = hrEmail || job.hrEmail;
    job.applyLink = applyLink || job.applyLink;
    job.description = description || job.description;
    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a job
// @desc Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Use deleteOne or findByIdAndDelete
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

