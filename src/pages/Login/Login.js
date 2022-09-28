import React from "react";
import "./Login.css";
import user from "../../assets/images/form/user.png"
import senha from "../../assets/images/form/senha.png"
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <p className="boas-vindas">Projeto Dactilus</p>
      <div className="azulzao"></div>
      <form className="login">
        <p id="login-texto">Login</p>
        <img src={user} id="user"></img>
        <input type={'email'} className="campo" placeholder="Email" />
        <img src={senha} id="cadeado"></img>
        <input type={'password'} className="campo" placeholder="Senha"></input>
        <Link to="/recuperar" id="esqueceu">Esqueceu a senha?</Link>
        <button id="botao-login">Entrar</button>
      </form>
    </>
  );
}

export default Login;
