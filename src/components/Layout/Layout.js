import React from "react";
import Content from "../../navigation/Content";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function Layout() {
  return (
    <div>
      <Navigation />
      <Content />
      <Footer />
    </div>
  );
}

export default Layout;
