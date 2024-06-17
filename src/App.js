import React from "react";
// import { Route, Routes } from "react-router-dom";
import { RoutePage } from "./route";
import { UserProvider } from "./data/UserContext";

function App() {
  return (
    <div>
        {/* <UserProvider> */}
        <RoutePage />
      {/* </UserProvider> */}
    </div>
  );
}

export default App;
