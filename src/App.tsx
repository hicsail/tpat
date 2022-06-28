import React, { FC } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";

const App: FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
