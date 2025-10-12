import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  hrEmail: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30d", // auto delete after 30 days
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
