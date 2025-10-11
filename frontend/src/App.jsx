import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Header/>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
