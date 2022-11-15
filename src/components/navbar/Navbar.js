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
        "https://s2.glbimg.com/aD-asg1A-I--Mj6abYYuzrSxEkg=/0x0:2775x1850/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/A/x4O7j9R5i4N0ecWBU7vw/lula-31.jpg",
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
          <Link className="navbar-dicionario">
            Dicionário
          </Link>
          <Link to="/traducao-libras" className="navbar-traduzir">
            Traduzir
          </Link>
          <Link to={currentUser ? "/chat" : "/login"} className="navbar-chat">
            Chat
          </Link>
          {currentUser ? (
            <AuthCard avatarSrc={currentUser.photoURL} />
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
