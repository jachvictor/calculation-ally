import React, { useEffect, useState } from "react";
import "./Menu.css";
import { GrCalculator, GrUpdate, GrUpgrade } from "react-icons/gr";
import { GiUpgrade } from "react-icons/gi";
import { TbSettings } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";

export default function Menu({ setShowMenu }) {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

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
  const handleNavigate = (path) => {
    navigate(path);
    // window.navigator(path)
    setShowMenu(false);
  };
  return (
    <main className="menu-contain">
      <ul className="hold-menu-list">
        <li onClick={() => handleNavigate("/")} className="menu-list">
          <GrCalculator
            className={pathName === "/" ? "menu-icon" : null}
            size={40}
          />
          {width > 500 && "Calculator"}
        </li>
        <li
          onClick={() => handleNavigate("/adcalculator")}
          className="menu-list"
        >
          <GrUpgrade
            className={pathName === "/adcalculator" ? "menu-icon" : null}
            size={40}
          />
          {width > 500 && "Advanced"}
        </li>
      </ul>

      <li onClick={() => handleNavigate("/settings")} className="menu-list">
        <TbSettings
          className={pathName === "/settings" ? "menu-icon" : null}
          size={50}
        />{" "}
        {width > 500 && "Settings"}
      </li>
    </main>
  );
}
