import React from "react";
import "./Button";

function Button({ onClick, className, type,text }) {
  return (
    <main>
      <button onClick={onClick} className={className} type={type}>{text}</button>
    </main>
  );
}

export default Button;
