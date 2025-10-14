import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Dashboard/adminDashboard";
import CreateJob from "./pages/Dashboard/CreateJob";
import CreateBlog from "./pages/Dashboard/CreateBlog";
import AllJobs from "./pages/Dashboard/AllJobs";
import AllBlogs from "./pages/Dashboard/AllBlogs";

// User Pages
import Browse from "./pages/Jobs/Browse";
import AllJobsUser from "./pages/Jobs/Jobs";
import JobDetail from "./pages/Jobs/JobDetail";
import BlogDetails from "./pages/Blog/BlogDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* --- Public/User Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/allUserJobs" element={<AllJobsUser />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/job/:id" element={<JobDetail />} />

      
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* --- Admin Routes --- */}
        <Route path="/admin-login" element={<AdminLogin />} />
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
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="all-blogs" element={<AllBlogs />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
