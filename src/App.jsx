import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "../src/components/Landing";
import Login from "../src/components/authentication/Login";
import Register from "../src/components/authentication/Register";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
