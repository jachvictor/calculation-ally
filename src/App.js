import React from "react";
import { Route, Routes } from "react-router-dom";
import { Calculator, AdCalculator } from "./pages";
import { Navbar } from "./mainComponents";
import { RoutePage } from "./route";

function App() {
  return (
    <div>
      <RoutePage />
    </div>
  );
}

export default App;
