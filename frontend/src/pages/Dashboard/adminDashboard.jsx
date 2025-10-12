// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar.jsx";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
