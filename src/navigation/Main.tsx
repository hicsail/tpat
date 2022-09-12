import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";

import Contact from "../pages/contact";
import Instruction from "../pages/instruction";
import Tutorial from "../pages/tutorial";
import Login from "../pages/Login";
import { SCREENS } from "../constants/screens";
import TryItYourself from "../pages/TryItYourself";
import Task from "../pages/Task";
import Tutorial2 from "../pages/Tutorial2";

export const Main = () => {
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
