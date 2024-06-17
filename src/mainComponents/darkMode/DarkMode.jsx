import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../../assets/Sun.svg";
import { ReactComponent as Moon } from "../../assets/Moon.svg";
import "./DarkMode.css";

function DarkMode() {
  const setDarKMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleMode = (e) => {
    setDark(!dark);

    if (dark) {
      setDarKMode();
    } else {
      setLightMode();
    }
  };

  const initialState = JSON.parse(localStorage.getItem("mode")) || false;
  const [dark, setDark] = useState(initialState);
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  // useEffect(() => {
  //   if (dark) {
  //     toast.success("App on dark mode");
  //   } else  {
  //     toast.success("App on light mode");
  //   }
  // }, [dark]);
  return (
    <>
      <div
        onClick={() => toggleMode()}
        className={dark ? "dark-mode" : "light-mode"}
      >
        <button className={dark ? "btn-light" : "btn-dark"}></button>

        <Sun className="sun" />
        <Moon className="moon" />
      </div>
    </>
  );
}

export default DarkMode;
