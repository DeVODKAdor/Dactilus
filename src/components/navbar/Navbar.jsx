import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/dactiluslogo.png";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [path, setPath] = useState("/login")
  const [button, setButton] = useState(<Link to="/login" className="navbar-login">Login</Link>)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/")
      setButton(<Link to="/login" className="navbar-login">Login</Link>)
    } catch {
      console.log("Falha ao sair");
    }
  }
  useEffect(() => {
    if (currentUser) {
      setButton(<Link type="button" onClick={handleLogout}>Sair</Link>)
      setPath("/chat")
    }
  }, [currentUser])


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
          <Link to={path} className="navbar-chat">
            Chat
          </Link>
          {button}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
