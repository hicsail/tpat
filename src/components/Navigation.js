import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./styles.css";

//className="navLinks" style=
//</nav>{{transform: open ? 'translateX (0px)' : ''}}>

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
            <a href="/webcam">Webcam Page</a>
          </li>
          <li>
            <a href="/try-it-yourself">Try It Yourself</a>
          </li>
          {/**
           * <li>
            <a href="/about">About</a>
          </li> */}

          <li>
            <a href="/">Home</a>
          </li>
        </ul>
        <i onClick={() => setOpen(!open)} className="fa-solid fa-bars burger" />
      </div>
    </div>
  );
}

export default Navigation;
