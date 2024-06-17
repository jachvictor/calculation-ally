import React from "react";
import "./Settings.css";
import { DarkMode, Switch } from "../../mainComponents";
import { PiCopyright, PiPalette } from "react-icons/pi";
import logo from "../../assets/logo.png";
import { MdMemory, MdOutlineScience } from "react-icons/md";

export default function Settings({
  toggle,
  setOnMem,
  omMen: onMen,
  onClick,
  onClick2,
  setonSci,
  onSci,
}) {
  return (
    <main className="set-contain">
      <section className="set-section">
        <figure className="set-list">
          <header>
            {" "}
            <PiPalette /> App theme
          </header>
          <div>Select which app theme to display</div>

          <span>
            <DarkMode toggleMode={toggle} />
          </span>
        </figure>
        <figure className="set-list">
          <header>
            <MdMemory />
            Enable Memory
          </header>
          <div>
            Activate this setting to save calculations from your history
          </div>

          <span>
            <Switch setOff={setOnMem} off={onMen} onClick={onClick} />
          </span>
        </figure>
        <figure className="set-list">
          <header>
            <MdOutlineScience /> Scientific Mode
          </header>
          <div>Enable Scientific functions in the calculator</div>

          <span>
            <Switch setOff={setonSci} off={onSci} onClick={onClick2} />
          </span>
        </figure>
      </section>
      <section className="about-section">
        <div className="hold-brand">
          <img src={logo} alt="" />{" "}
          <div className="brand">
            <p>Calculation Ally</p>
            <p>
              <PiCopyright /> 2024. All rights reserved
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
