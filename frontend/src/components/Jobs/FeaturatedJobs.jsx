import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import SeeMoreButton from "./SeeMoreButton";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/jobs/recent/all");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching recent jobs:", error);
      }
    };

    fetchJobs();

    // Optional: Auto refresh every 30 seconds
    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 px-4">
        Featured Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 px-4">No recent jobs available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center px-4">
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

          {/* --- See More Jobs Button at the end --- */}
          <div className="mt-12 flex justify-center px-4">
            <SeeMoreButton />
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedJobs;
