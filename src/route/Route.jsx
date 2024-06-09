// import React from 'react'
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Calculator, AdCalculator } from "../pages";
// import { Calculator } from "../pages";
import { Navbar } from "../mainComponents";

export default function RoutePage() {
  const [theme, setTheme] = useState(true);
  const handleToggleMode = () => {
    const themeSwitch = document.querySelector(".theme-switch");
    const btnSwitch = document.querySelector(".switch-btn");

    const background = document.querySelector(".calc-contain");

    const calcBtn = document.querySelector(".calc-btn");
    const screen = document.querySelector(".screen-section");

    setTheme(!theme);
    if (theme) {
      // themeSwitch.classList.remove("theme-switch-dark");
      themeSwitch.setAttribute("class","theme-switch");
      // btnSwitch.classList.remove("switch-btn-dark");
      btnSwitch.setAttribute("class","switch-btn");

      // background.classList.remove("calc-contain-dark");
      background.setAttribute("class","calc-contain");

      // calcBtn.classList.remove("calc-btn-dark");

      calcBtn.setAttribute("class","calc-btn");
    } else if(!theme) {
      try {
        themeSwitch.setAttribute("class","theme-switch-dark");
      // themeSwitch.classList.remove("theme-switch");
      btnSwitch.setAttribute("class","switch-btn-dark");
      // btnSwitch.classList.remove("switch-btn");

      background.setAttribute("class","calc-contain-dark");
      // background.classList.remove("calc-contain");

      calcBtn.setAttribute("class","calc-btn-dark");
      // calcBtn.classList.remove("calc-btn");
      } catch (error) {
        console.log("error massege:",error)
      }
      
      
    }
  };
  return (
    <div>
      <Navbar ToggleMode={handleToggleMode} />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route exact path="/adcalculator" element={<AdCalculator />} />
      </Routes>
    </div>
  );
}
