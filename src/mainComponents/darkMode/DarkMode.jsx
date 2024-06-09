import React from "react";
import { ReactComponent as Sun } from "../../assets/Sun.svg";
import { ReactComponent as Moon } from "../../assets/Moon.svg";
import "./DarkMode.css";

function DarkMode() {
  const setDarKMode = () => {
    document.querySelector(".cal-contain").setAttribute("data-theme", "dark");
    document.querySelector(".calc-btn").setAttribute("data-theme", "dark");
    document
      .querySelector(".screen-section")
      .setAttribute("data-theme", "dark");
    // document.querySelector().setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector(".cal-contain").setAttribute("data-theme", "light");
    document.querySelector(".calc-btn").setAttribute("data-theme", "light");
    document
      .querySelector(".screen-section")
      .setAttribute("data-theme", "light");
    // document.querySelector().setAttribute("data-theme", "light");
  };

  const toggleMode = (e) => {
    if (e.target.checked) {
      setDarKMode();
    } else {
      setLightMode();
    }
  };
  return (
    <div className="dark_mode">
      <input
        onChange={toggleMode}
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
      />
      <label className="dark_mode_label" for="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
}

export default DarkMode;
