import { Alert, CircularProgress } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password);
      navigate("/", { state: {newUsername: username} });
    } catch {
      setError("Falha ao cadastrar");
      setLoading(false);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithPopup();
      navigate("/");
    } catch {
      setError("Algum erro aconteceu");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid text-center fundo-login">
      <div className="row justify-content-between">
        <div className="col-12 p-2">
          <p className="text-center mt-4">Projeto Dactilus</p>
        </div>
        <div className="col-3">
          <p className="texto cima">Já possui conta?</p>
          <p className="texto baixo">Clique aqui e faça seu login agora</p>
          <Link to="/login" type="button" className="btn btn-outline-light">
            Login
          </Link>
        </div>
        <div className="col-5">
          <p className="naosei">Cadastro</p>
          <form onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mb-3">
              <label htmlFor="exampleInputUsername1" className="form-label">
                Nome de usuário
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername1"
                aria-describedby="userNameHelp"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Mínimo de seis caracteres"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirme a sua senha
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {loading && <CircularProgress />}
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-3 w-50"
              disabled={
                email === "" ||
                username === "" ||
                password === "" ||
                confirmPassword === "" ||
                password.length < 6 ||
                password !== confirmPassword ||
                loading
              }
            >
              CADASTRAR
            </button>
            <p className="mb-3">ou</p>
            <button
              className="btn btn-outline-primary"
              onClick={handleGoogle}
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
