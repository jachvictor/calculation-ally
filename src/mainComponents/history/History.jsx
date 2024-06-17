import React from "react";
import "./History.css";
import { PiTrash, PiTrashBold } from "react-icons/pi";
import { GrSave } from "react-icons/gr";

export default function History({
  history,
  title,
  handleClear,
  onClick,
  onMem,
}) {
  // console.log("id", id);
  return (
    <main className="history-contain">
      <ul>
        {history.map((calculation, index) => (
          <div className="history-data">
            <div>
              <li key={index}>
                {calculation.icon} {calculation.input} =
              </li>
              <span>{calculation.result}</span>
            </div>
            {onMem && (
              <GrSave className="save-history" onClick={() => onClick(index)} />
            )}
          </div>
        ))}
      </ul>
      <div className="clear-history">
        <PiTrashBold onClick={handleClear} className="trash-icon" />
      </div>
    </main>
  );
}
