import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import NotFound from "./components/NotFound";

class App extends React.Component {
  render() {
    const queryParams = new URLSearchParams(window.location.search);
    return (
      <div className="mainWrapper">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home queryParams={queryParams} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
