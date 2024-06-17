import React from "react";
import "./Switch.css";

export default function Switch({ off, setOff, onClick }) {
  return (
    <div onClick={onClick} className={off ? "on-mode" : "off-mode"}>
      <button className={off ? "btn-off" : "btn-on"}></button>
    </div>
  );
}
