import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-secondary mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            IMDB
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
