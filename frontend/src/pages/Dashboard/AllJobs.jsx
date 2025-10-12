import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob, updateJob } from "../../redux/jobSlice.js";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AllJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    hrEmail: "",
    applyLink: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Delete job
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id))
        .unwrap()
        .then(() => toast.success("Job deleted successfully"))
        .catch((err) => toast.error(err.message));
    }
  };

  // Open update modal
  const handleEdit = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      hrEmail: job.hrEmail,
      applyLink: job.applyLink,
      description: job.description,
      company: job.company,
    });
    setShowModal(true);
  };

  // Update job
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateJob({ id: selectedJob._id, jobData: formData }))
      .unwrap()
      .then(() => {
        toast.success("Job updated successfully");
        setShowModal(false);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Posted Jobs
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl bg-white">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Title</th>
                <th className="px-6 py-3 border-b">HR Email</th>
                <th className="px-6 py-3 border-b">Apply Link</th>
                <th className="px-6 py-3 border-b">Posted On</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">{index + 1}</td>
                  <td className="px-6 py-3 border-b font-medium">{job.title}</td>
                  <td className="px-6 py-3 border-b">{job.hrEmail}</td>
                  <td className="px-6 py-3 border-b text-blue-600 underline">
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                      Apply
                    </a>
                  </td>
                  <td className="px-6 py-3 border-b">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border-b flex gap-4">
                    <FiEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(job)}
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(job._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Update Job</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="HR Email"
                value={formData.hrEmail}
                onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Apply Link"
                value={formData.applyLink}
                onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                className="border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border px-3 py-2 rounded"
                rows={4}
                required
              ></textarea>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
