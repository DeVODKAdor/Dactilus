import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import AuthCard from "../authCard/AuthCard.js";
import logo from "../../assets/images/dactiluslogo.png";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

function Navbar() {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (location.state !== null) {
    updateProfile(currentUser, {
      displayName: location.state.newUsername,
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTuzV2RgxmTJz27y0UCftD47PnWBKjP12sPA&s",
    });
  }

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
          <Link to="/traducao-libras" className="navbar-traduzir">
            Traduzir
          </Link>
          <Link to={currentUser ? "/chat" : "/login"} className="navbar-chat">
            Chat
          </Link>
          {currentUser ? (
            <AuthCard
              avatarSrc={currentUser.photoURL}
              displayName={currentUser.displayName}
            />
          ) : (
            <Link to="/login" className="navbar-login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
