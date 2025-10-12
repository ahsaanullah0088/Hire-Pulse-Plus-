import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Dashboard/adminDashboard";
import CreateJob from "./pages/Dashboard/CreateJob";
import CreateBlog from "./pages/Dashboard/CreateBlog";
import AllJobs from "./pages/Dashboard/AllJobs"; // Admin's job page
import AllBlogs from "./pages/Dashboard/AllBlogs";
// User Pages
import Browse from "./pages/Jobs/Browse"; // User browse/search page
import AllJobsUser from "./pages/Jobs/Jobs"; // User all jobs page
import JobDetail from "./pages/Jobs/JobDetail";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* --- Public/User Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/allUserJobs" element={<AllJobsUser />} /> {/* User sees all jobs */}
        <Route path="/browse" element={<Browse />} /> {/* Search results */}
        <Route path="/job/:id" element={<JobDetail />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- Admin Dashboard --- */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateJob />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="all-jobs" element={<AllJobs />} /> {/* Admin sees all jobs */}
          <Route path="all-blogs" element={<AllBlogs />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
