import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Calculator, AdCalculator, Settings, ErrorPage } from "../pages";
import { Navbar, Menu } from "../mainComponents";
import { UserProvider } from "../data/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RoutePage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const initialState = JSON.parse(localStorage.getItem("onmem")) || false;
  const initialState2 = JSON.parse(localStorage.getItem("onsci")) || false;
  const [onMem, setOnMem] = useState(initialState);
  const [onSci, setonSci] = useState(initialState2);
  useEffect(() => {
    localStorage.setItem("onmem", JSON.stringify(onMem));
  }, [onMem]);
  useEffect(() => {
    localStorage.setItem("onsci", JSON.stringify(onSci));
  }, [onSci]);

  const toggleMem = () => {
    setOnMem(!onMem);
  };
  const toggleSci = () => {
    // setOnMem(!onMem);
    setonSci(!onSci);
  };

  return (
    // <UserProvider>
    <div>
      <Navbar
        setShowHistory={setShowHistory}
        showHistory={showHistory}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      {showMenu && (
        <div className="menu-section">
          <Menu setShowMenu={setShowMenu} />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Calculator
              showMenu={showMenu}
              setShowHistory={setShowHistory}
              showHistory={showHistory}
              onMem={onMem}
              onSci={onSci}
            />
          }
        />
        <Route exact path="/adcalculator" element={<AdCalculator />} />
        <Route
          exact
          path="/settings"
          element={
            <Settings
              omMen={onMem}
              onClick={toggleMem}
              setOnMem={setOnMem}
              setonSci={setOnMem}
              onClick2={toggleSci}
              onSci={onSci}
            />
          }
        />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
    // </UserProvider>
  );
}
