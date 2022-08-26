import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="header">
        <ul className="navLinks">
          <a className="siteName" href="/">
            TPAT
          </a>
          <li>
            <Link to="/login">Enter Credentials</Link>
          </li>
          <li>
            <Link to="/try-it-yourself">Try It Yourself</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <i onClick={() => setOpen(!open)} className="fa-solid fa-bars burger" />
      </div>
    </div>
  );
}

export default Navigation;
