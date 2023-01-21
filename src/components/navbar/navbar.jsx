import React from "react";
import logo from "./logo.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img alt="logo" src={logo} />
      <div className="navbar-title">Welcome to HDFC Bank NetBanking</div>
    </div>
  );
};
