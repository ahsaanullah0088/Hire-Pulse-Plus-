import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobs/JobCard"; // JobCard layout
import { useLocation } from "react-router-dom";

const Browse = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract query param from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/jobs${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`
        );
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery]); // refetch when query changes

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          {searchQuery ? `Search Results for "${searchQuery}"` : "All Jobs"}
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                title={job.title}
                company={job.company}
                hrEmail={job.hrEmail}
                applyLink={job.applyLink}
                description={job.description}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No jobs found for "{searchQuery}"
          </p>
        )}
      </div>
    </section>
  );
};

export default Browse;
