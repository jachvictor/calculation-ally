import React from "react";
// import "./Button";

function Button({ onClick, className, type,text }) {
  return (
    <>
      <button onClick={onClick} className={className} type={type}>{text}</button>
    </>
  );
}

export default Button;
