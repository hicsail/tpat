import { useState } from "react";
import { Link } from "react-router-dom";
import { SCREENS } from "../constants/screens";
import "./styles.css";


function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="header">
        <ul className="navLinks">
          <a className="siteName">
            <Link to="/" style={{ textDecoration: "none" }}>
              Teacher Tasks
            </Link>
                 </a>
          <li>
            <Link to={SCREENS.LOGIN}>Enter Credentials</Link>
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
