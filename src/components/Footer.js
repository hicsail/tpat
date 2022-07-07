import React, { useState } from "react";
//import {Link} from 'react-router-dom';
import "./styles.css";

//className="navLinks" style=
//</nav>{{transform: open ? 'translateX (0px)' : ''}}>

function Footer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="footerContainer">
      <div className="footer">
        <ul className="footerLinks">
          <li>
            <a href="/try-it-yourself">Try It Yourself</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
         {/*
          <li>
            <a href="/about">About</a>
          </li>
  */}
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
      <hr style={{ marginTop: "1%", marginBottom: "1%" }}></hr>
      <p class="footerRight">@2022 TPAT All Right Reserved</p>
    </div>
  );
}

export default Footer;
