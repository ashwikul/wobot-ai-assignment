import React from "react";
import logo from "../assets/logo.svg";
function Header() {
  return (
    <div className="headers">
      <div className="title">
        <h4>Cameras</h4>
        <p>Manage your cameras here.</p>
      </div>
      <input className="search" type="text" placeholder="Search"></input>
    </div>
  );
}

export default Header;
