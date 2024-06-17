import React from "react";
import error from "../../assets/error404.png";
import "./ErrorPage.css";
import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="error-contain">
      <img src={error} alt="" />
      <button onClick={() => navigate("/")}>go back to home</button>
    </div>
  );
}
