import { Route, Routes, useLocation } from "react-router-dom";

import Contact from "../pages/contact";
import Tutorial from "../pages/tutorial";
import Login from "../pages/Login";
import { SCREENS } from "../constants/screens";
import TryItYourself from "../pages/TryItYourself";
import Task from "../pages/Task";
import CamMicCheck from "../pages/CamMicCheck";

import Tutorial2 from "../pages/Tutorial2";
import { useEffect, useState } from "react";

export const Main = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<TryItYourself />} />
        <Route path={SCREENS.LOGIN} element={<Login />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorial2" element={<Tutorial2 />} />
        <Route path={SCREENS.CAM_MIC_CHECK} element={<CamMicCheck />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </div>
  );
};

export default Main;
