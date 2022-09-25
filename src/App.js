import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carrossel from "./components/carrossel/Carrossel";
import Titulo from "./components/titulos/Titulo";
import Card from "./components/card/Card";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Carrossel />
        <Titulo texto="PROJETO DACTILUS" />
        <div className="card-container">
          <Card numero="1" texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"/>
          <Card numero="2" texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"/>
          <Card numero="3" texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"/>
        </div>
        <Titulo texto="TECNOLOGIAS UTILIZADAS" />
        <div className="tecnologias-container">
          <Titulo />
          <Titulo />
          <Titulo />
        </div>
        <Routes>
          <Route path="/" exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
