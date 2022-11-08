import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TraducaoLibras from "./pages/traducao-libras/TraducaoLibras";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/traducao-libras" exact element={<TraducaoLibras />} />
          <Route path="/login" exact element={<Login />}/>
          <Route path="/registro" exact element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
