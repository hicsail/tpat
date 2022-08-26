import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import TryItYourself from "../pages/tryityourself";
import About from "../pages/about";
import Task from "../pages/task";

import WebCam from "../pages/webcam";
import Contact from "../pages/contact";
import Instruction from "../pages/instruction";
import Tutorial from "../pages/tutorial";
import Tutorial2 from "../pages/tutorial2";
import Login from "../pages/login";

export const Main = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/try-it-yourself" element={<TryItYourself />} />
        <Route path="/webcam/:id" element={<WebCam />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorial2" element={<Tutorial2 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/instruction/:id" element={<Instruction />} />
      </Routes>
    </div>
  );
};

export default Main;
