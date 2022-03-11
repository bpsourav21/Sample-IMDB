import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
// import Item from "./components/Item";

class App extends React.Component {
  render() {
    return (
      <div className="mainWrapper">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/movie-detail/:id" element={<Item />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
