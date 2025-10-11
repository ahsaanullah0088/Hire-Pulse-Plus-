import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
