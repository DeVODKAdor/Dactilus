import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/dactiluslogo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="dactilus logo" className="logo" />
          </Link>
          <Link to="/" className="navbar-home">
            Home
          </Link>
          <Link to="/dicionario" className="navbar-dicionario">
            Dicionário
          </Link>
          <Link to="/traducao-libras" className="navbar-traduzir">
            Traduzir
          </Link>
          <Link to="/chat" className="navbar-chat">
            Chat
          </Link>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
