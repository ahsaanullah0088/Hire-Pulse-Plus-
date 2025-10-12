import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../redux/jobSlice";
import { toast } from "react-hot-toast";

const CreateJob = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    title: "",
    hrEmail: "",
    applyLink: "",
    description: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(createJob(formData));

      if (createJob.fulfilled.match(resultAction)) {
        toast.success("✅ Job created successfully!");
        setFormData({
          title: "",
          hrEmail: "",
          applyLink: "",
          description: "",
        });
      } else {
        toast.error(
          resultAction.payload?.message ||
            "Something went wrong while creating the job."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the job.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🧾 Post a New Job
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Frontend Developer"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* HR Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HR Email
            </label>
            <input
              type="email"
              name="hrEmail"
              value={formData.hrEmail}
              onChange={handleChange}
              required
              placeholder="e.g., hr@company.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Apply Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apply Link
            </label>
            <input
              type="url"
              name="applyLink"
              value={formData.applyLink}
              onChange={handleChange}
              required
              placeholder="https://company.com/careers"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
              placeholder="Write job details here..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
