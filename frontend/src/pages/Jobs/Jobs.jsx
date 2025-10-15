// src/pages/User/AllJobsUser.jsx
import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobs/JobCard";
 // correct path to JobCard

const AllJobsUser = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch jobs from backend ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/jobs"); // backend API
        const data = await res.json();

        // --- If you want, filter out admin-only jobs here ---
        // const userJobs = data.filter(job => !job.isAdminOnly); 
        // setJobs(userJobs);

        setJobs(data); // currently all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50=== min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- Section Heading --- */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          All Jobs
        </h2>

        {/* --- Jobs Grid --- */}
        {jobs.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {jobs.map(job => (
  <JobCard
    key={job._id}
    _id={job._id}
    title={job.title}
    company={job.company}
    hrEmail={job.hrEmail}
    description={job.description}
    applyLink={job.applyLink}
  />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No jobs available.</p>
        )}
      </div>
    </section>
  );
};

export default AllJobsUser;
