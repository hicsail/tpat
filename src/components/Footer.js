import React from "react";
import { Link } from "react-router-dom";
import { APP_VERSION } from "../config/config";
import { SCREENS } from "../constants/screens";
import "./styles.css";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footer">
        <ul className="footerLinks">
          <li>
            <Link to={SCREENS.LOGIN}>Enter Credentials</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
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
      <p className="footerRight">
        @2022 TPAT All Right Reserved v{APP_VERSION}
      </p>
    </div>
  );
}

export default Footer;
