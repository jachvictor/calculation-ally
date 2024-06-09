import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import { GrHistory } from "react-icons/gr";
import { PiCalculatorBold, PiMathOperationsBold } from "react-icons/pi";
import { GrMenu } from "react-icons/gr";
import DarkMode from "../darkMode/DarkMode";

function Navbar({ ToggleMode }) {
const [showHistory, setShowHistory]=useState(false)
  const toggleHistory=()=>{
    setShowHistory(!showHistory)
    const history = document.querySelector(".history-mobile")
    if (showHistory) {
      history.style.display="none"
    }else{
      history.style.display="flex"
    }
  }
  return (
    <main className="nav-container">
      {/* <GrMenu color="white"/> */}
      <img className="logo" src={logo} alt="" />

      <div className="nav-left">
        <DarkMode />
        {/* <figure className="theme-switch">
          <button onClick={ToggleMode} className="switch-btn"></button>
        </figure> */}
        <GrHistory onClick={toggleHistory} color="white" className="history-icon" />
      </div>
    </main>
  );
}

export default Navbar;
