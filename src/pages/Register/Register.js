import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const firebaseConfig = {
    apiKey: "AIzaSyDIgv41dwonLQHn_H3oblp8Nicpm_nRggs",
    authDomain: "dactilus-12bc4.firebaseapp.com",
    projectId: "dactilus-12bc4",
    storageBucket: "dactilus-12bc4.appspot.com",
    messagingSenderId: "474280065419",
    appId: "1:474280065419:web:3e9890d9bb67b3acd6d78e",
    measurementId: "G-3LDHLXJ2EP",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const RegisterFirebase = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-between">
        <div className="col-12 p-2">
          <p className="text-center mt-4">Projeto Dactilus</p>
        </div>
        <div className="col-3">
          <p className="texto cima">Já possui conta?</p>
          <p className="texto baixo">Clique aqui e faça seu login agora</p>
          <Link to="/login" type="button" class="btn btn-outline-light">
            Login
          </Link>
        </div>
        <div className="col-5">
          <p className="naosei">Cadastro</p>
          <form>
            <div class="mb-3">
              <label for="exampleInputUsername1" class="form-label">
                Nome de usuário
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                aria-describedby="userNameHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                E-mail
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary mb-3"
              onClick={RegisterFirebase(email, password)}
            >
              CADASTRAR
            </button>
            <p className="mb-3">ou</p>
            <button className="btn btn-outline-primary"></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
