import { Route, Routes, useLocation } from "react-router-dom";

import Contact from "../pages/contact";
import Tutorial from "../pages/tutorial";
import Login from "../pages/Login";
import { SCREENS } from "../constants/screens";
import TryItYourself from "../pages/TryItYourself";
import Task from "../pages/Task";
import Tutorial2 from "../pages/Tutorial2";
import { useEffect, useState } from "react";

export const Main = () => {
  // let location = useLocation();
  // const [tutorialPageKey, setTutorialPageKey] = useState("");

  // useEffect(() => {
  //   console.log("location changed", location);
  //   if (!tutorialPageKey && location.pathname.includes(SCREENS.TASK)) {
  //     console.log("setting key");

  //     setTutorialPageKey(location.key);
  //   }
  // }, [location]);

  // window.onpopstate = (event) => {
  //   // event.preventDefault();
  //   console.log("comp", event.state.key, tutorialPageKey);

  //   console.log("onpop state. event", event);
  //   // window.history.go();
  //   // if (event.state.key == tutorialPageKey) {
  //   //   console.log("LANDED on task!!");
  //   //   window.history.pushState();
  //   // }
  // };

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<TryItYourself />} />
        <Route path={SCREENS.LOGIN} element={<Login />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorial2" element={<Tutorial2 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </div>
  );
};

export default Main;
