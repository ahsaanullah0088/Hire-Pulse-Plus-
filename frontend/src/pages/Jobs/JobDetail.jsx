import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Safety check

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">Job not found!</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          {job.title}
        </h2>
        <p className="text-gray-600 text-center mb-4">{job.company}</p>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 mb-4">{job.description}</p>

          <h3 className="text-lg font-semibold mb-1">HR Email:</h3>
          <a
            href={`mailto:${job.hrEmail}`}
            className="text-blue-600 underline mb-4 block"
          >
            {job.hrEmail}
          </a>

          <h3 className="text-lg font-semibold mb-1">Apply Link:</h3>
          <a href={job.applyLink} className="text-blue-600 underline">
          
            {job.applyLink}
          </a>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
