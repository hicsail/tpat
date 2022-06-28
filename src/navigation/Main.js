import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import TryItYourself from "../pages/tryityourself";
import About from "../pages/about";

import WebCam from "../pages/webcam";

export const Main = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/try-it-yourself" element={<TryItYourself />} />
        <Route path="/webcam" element={<WebCam />} />
      </Routes>
    </div>
  );
};

export default Main;
