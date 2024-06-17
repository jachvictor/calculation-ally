import React, { useState, useEffect } from "react";
import { TbHttpDelete } from "react-icons/tb";
import "./Memory.css";

export default function Memory({ loading, memory, onClick }) {
  //   const [memory] = JSON.parse(window.localStorage.getItem("memory"));
  //   const id = window.localStorage.getItem("id");

  console.log("memory", loading);
  const [posts, setPosts] = useState([]);
  if (loading) {
    return <div>loaading</div>;
  }

  return (
    <main className="memory-contain">
      {memory.length > 0 ? (
        <ul>
          {memory.map((value, index) => (
            <div key={index} className="memory-data">
              <div>
                <li key={index}>
                  {value.icon} {value.input} =
                </li>
                <span>{value.result}</span>
              </div>
              <TbHttpDelete onClick={() => onClick(value.id)} />
            </div>
          ))}
        </ul>
      ) : (
        <div className="memory-message"
         
        >
          {loading ? "loading" : "memory is empty"}
        </div>
      )}
    </main>
  );
}
