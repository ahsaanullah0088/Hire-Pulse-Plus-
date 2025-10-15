import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import SeeMoreButton from "./SeeMoreButton";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      // ask the API for a limit (if your API supports it)
      const res = await axios.get("http://localhost:8000/api/jobs/recent/all", {
        params: { limit: 8 } // optional - backend must support this
      });

      // helpful debug logs — remove later
      console.log("Raw response:", res);
      console.log("res.data:", res.data);

      // handle different response shapes robustly:
      // - res.data could be an array
      // - or res.data.jobs / res.data.data could be the array
      const jobsArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.jobs)
        ? res.data.jobs
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      // show what we detected
      console.log("Detected jobsArray length:", jobsArray.length);

      // limit to 8 safely
      setJobs(jobsArray.slice(0, 8));
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
    }
  };

  fetchJobs();

  const interval = setInterval(fetchJobs, 30000);
  return () => clearInterval(interval);
}, []);


  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10 px-4">
        Featured Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 px-4">No recent jobs available.</p>
      ) : (
        <>
          {/* ✅ Responsive 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center px-4">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                _id={job._id}
                title={job.title}
                company={job.company}
                description={job.description}
                applyLink={job.applyLink}
              />
            ))}
          </div>

          {/* See More Jobs Button */}
          <div className="mt-12 flex justify-center px-4">
            <SeeMoreButton />
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedJobs;
