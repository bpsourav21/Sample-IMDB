import React from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
// import PhoneDetail from "./components/PhoneDetail";

function App() {
  return (
    <div className="mainWrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/phone-detail/:id" element={<PhoneDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
