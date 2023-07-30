import React from "react";
import { Outlet } from "react-router-dom";
//Pages
import { Header, Footer } from "../components";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
