import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import { GrClose, GrHistory } from "react-icons/gr";
import { PiCalculatorBold, PiMathOperationsBold } from "react-icons/pi";
import { GrMenu } from "react-icons/gr";
import DarkMode from "../darkMode/DarkMode";
import { useLocation } from "react-router";

function Navbar({ showMenu, setShowMenu, showHistory, setShowHistory }) {
  const location = useLocation();
  const pathName = location.pathname;

  const [width, setWidth] = useState();
  useEffect(() => {
    // alert(screen);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // const [showHistory, setShowHistory] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);

  // const toogleMenu = () => {
  //   setShowMenu(!showMenu);
  //   const menu = document.querySelector(".menu-section");
  //   if (showMenu) {
  //     menu.style.display = "none";
  //   } else {
  //     menu.style.display = "flex";
  //   }
  // };
  // const toggleHistory = () => {
  //   setShowHistory(!showHistory);
  //   const history = document.querySelector(".history-mobile");
  //   if (showHistory) {
  //     history.style.display = "none";
  //   } else {
  //     history.style.display = "flex";
  //   }
  //
  return (
    <>
      <main className="nav-container">
        <img className="logo" src={logo} alt="" />

        <div className="nav-left">
          {pathName === "/" && (
            <GrHistory
              size={25}
              onClick={() => setShowHistory(!showHistory)}
              color="white"
              className="history-icon"
            />
          )}

          {!showMenu ? (
            <GrMenu
              size={30}
              className="toggle-menu"
              onClick={() => setShowMenu(!showMenu)}
              color="white"
            />
          ) : (
            <GrClose
              size={30}
              className="toggle-menu"
              onClick={() => setShowMenu(!showMenu)}
              color="white"
            />
          )}
        </div>
      </main>
    </>
  );
}

export default Navbar;
