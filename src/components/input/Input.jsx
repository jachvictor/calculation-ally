import React from "react";

function Input({ placeHolder, onChange, type, className }) {
  return (
    <main>
      <input
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        className={className}
      />
    </main>
  );
}

export default Input;
