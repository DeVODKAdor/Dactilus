import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="container-fluid text-center fundo-login">
      <div className="row justify-content-between">
        <div className="col-12 p-2">
          <p className="text-center mt-4">Projeto Dactilus</p>
        </div>
        <div className="col-3">
          <p className="texto cima">Não possui conta?</p>
          <p className="texto baixo">Clique aqui e cadastre-se agora</p>
          <Link to="/registro" type="button" class="btn btn-outline-light">
            Cadastre-se
          </Link>
        </div>
        <div className="col-5">
          <p className="naosei">Login</p>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                E-mail
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Senha
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" class="btn btn-primary mb-3">
              ENTRAR
            </button>
            <p className="mb-3">ou</p>
            <button className="btn btn-outline-primary"></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
