import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
// import PhoneDetail from "./components/PhoneDetail";

class App extends React.Component {
  render() {
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
}

export default App;
