import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { idText } from "typescript";
import { SCREENS } from "../constants/screens";
import "./styles.css";

function Navigation() {
  const [open, setOpen] = useState(false);
  let location = useLocation();
  const [disableLinks, setDisableLinks] = useState(false);

  //TODO extract intro a separate useIsOnTaskScreen hook
  useEffect(() => {
    if (location.pathname.includes(SCREENS.TASK)) {
      setDisableLinks(true);
    }
  }, [location]);

  return (
    <div>
      <div className="header">
        <ul className="navLinks">
          <a className="siteName">
            <Link to="/" style={{ textDecoration: "none" }}>
              Teacher Tasks
            </Link>
          </a>
          {!disableLinks && (
            <>
              <li>
                <Link to={SCREENS.LOGIN}>Enter Credentials</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </>
          )}
        </ul>
        <i onClick={() => setOpen(!open)} className="fa-solid fa-bars burger" />
      </div>
    </div>
  );
}

export default Navigation;
