import React, { FC, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { gets3Client, uploadTos3 } from "./utils/videoUploadUtils";

const App: FC = () => {
  // useEffect(() => {
  //   uploadTos3();
  // }, []);
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
