import { FC } from "react";
import Layout from "./components/Layout/Layout";
import { HashRouter as Router } from "react-router-dom";
const TAG = "App.tsx ";
const App: FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
