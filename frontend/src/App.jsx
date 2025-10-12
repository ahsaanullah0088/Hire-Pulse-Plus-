import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/auth/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element = {<AdminLogin/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><adminDashboard /></ProtectedRoute>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
