// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Briefcase, FileText, List, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Post Job", icon: <Briefcase size={20} />, path: "/admin-dashboard/create-job" },
    { name: "Post Blog", icon: <FileText size={20} />, path: "/admin-dashboard/create-blog" },
    { name: "All Jobs", icon: <List size={20} />, path: "/admin-dashboard/all-jobs" },
    { name: "All Blogs", icon: <LayoutDashboard size={20} />, path: "/admin-dashboard/all-blogs" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center py-6 border-b border-gray-800">
        
        <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg mb-2 text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} HirePulse+
      </div>
    </div>
  );
};

export default Sidebar;
