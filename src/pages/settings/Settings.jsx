import React from "react";
import "./Settings.css";
import { DarkMode, Switch } from "../../mainComponents";
import { PiCopyright } from "react-icons/pi";
import logo from "../../assets/logo.png";

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
          <header>App theme</header>
          <div>select which app theme to display</div>

          <span>
            <DarkMode toggleMode={toggle} />
          </span>
        </figure>
        <figure className="set-list">
          <header>Memory</header>
          <div>enable memory to save calculations</div>

          <span>
            <Switch setOff={setOnMem} off={onMen} onClick={onClick} />
          </span>
        </figure>
        <figure className="set-list">
          <header>Scientific</header>
          <div>enable Scientific features on calculator</div>

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
              <PiCopyright /> 2024. All rights preserved
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
