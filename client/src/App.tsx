import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Browse from "./pages/Browse";
import Superteam from "./pages/Superteam";
import BasicLayout from "./pages/BasicLayout"
import Login from "./pages/Login"
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout/>}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="login" element={<Login />} />
          <Route path="superteam" element={<Superteam />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
