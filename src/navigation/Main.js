import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import TryItYourself from "../pages/tryityourself";
import About from "../pages/about";
import Task from "../pages/task";

import WebCam from "../pages/webcam";
import Contact from "../pages/contact";

export const Main = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/try-it-yourself" element={<TryItYourself />} />
        <Route path="/webcam/:id" element={<WebCam />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </div>
  );
};

export default Main;
