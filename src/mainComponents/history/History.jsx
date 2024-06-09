import React from "react";
import "./History.css";
import { PiTrash, PiTrashBold } from "react-icons/pi";

export default function History({ history, title, handleClear }) {
  return (
    <main className="history-contain">
      <header>{title}</header>
      <ul>
        {history.map((calculation, index) => (
          <>
            <li key={index}>
              {calculation.icon} {calculation.input} =
            </li>
            <span>{calculation.result}</span>
          </>
        ))}
      </ul>
      <div className="clear-history">
        <PiTrashBold onClick={handleClear} className="trash-icon"/>
      </div>
    </main>
  );
}
