import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_VERSION } from "../config/config";
import { SCREENS } from "../constants/screens";
import "./styles.css";

function Footer() {
  let location = useLocation();
  const [disableLinks, setDisableLinks] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(SCREENS.TASK)) {
      setDisableLinks(true);
    }
  }, [location]);
  return (
    <div className="footerContainer">
      <div className="footer">
        <ul className="footerLinks">
          {!disableLinks && (
            <>
              <li>
                <Link to={SCREENS.LOGIN}>Enter Credentials</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>{" "}
            </>
          )}
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
