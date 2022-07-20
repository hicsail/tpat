import React from "react";
//import {Link} from 'react-router-dom';
import "./styles.css";

//className="navLinks" style=
//</nav>{{transform: open ? 'translateX (0px)' : ''}}>

function Footer() {
  //const [open, setOpen] = useState(false);
  return (
    <div className="footerContainer">
      <div className="footer">
        <ul class="footerLinks">
          <li>
            <a href="/try-it-yourself">Try It Yourself</a>
          </li>
          <li>
            <a href="mailto: abc@example.com">Contact Us</a>
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
      <hr
        style={{
          marginTop: "1%",
          marginBottom: "1%",
          color: "white",
          marginRight: "3%",
        }}
      ></hr>
      <p class="footerRight">@2022 TPAT All Right Reserved</p>
    </div>
  );
}

export default Footer;
