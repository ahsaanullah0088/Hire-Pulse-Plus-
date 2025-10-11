import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Add these 👇
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d' // ⏳ Automatically delete after 30 days
  }
});
const Job = mongoose.model("Job", jobSchema);
export default Job;
