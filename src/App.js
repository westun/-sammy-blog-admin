import React from "react";
import { NavBar } from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
