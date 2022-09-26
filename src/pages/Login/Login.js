import React from "react";

function Login() {
  return (
    <>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="#" class="sign-in-form">
              <h2 class="title">Login</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Senha" />
              </div>

              <p id="esqueceu">Esqueceu sua senha?</p>
              <a href="../Home/Home.html">
                <input type="button" value="Login" class="btn solid" />
              </a>
              <p class="social-text">------ ou -------</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>

            <form action="#" class="sign-up-form">
              <h2 class="title">Cadastro</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Senha" />
              </div>

              <a href="../Home/Home.html">
                <input type="button" class="btn" value="Cadastrar" />
              </a>
              <p class="social-text">------ ou ------</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Não possui conta?</h3>
              <p>Clique aqui e cadastra-se agora</p>
              <button class="btn transparent" id="sign-up-btn">
                Cadastre-se
              </button>
            </div>
            <img
              src="C:\Users\195653\Desktop\Login\Front\img\register.png"
              class="image"
              alt=""
            />
          </div>

          <div class="panel right-panel">
            <div class="content">
              <h3>Login</h3>
              <p>Clique aqui para fazer login</p>
              <p></p>
              <button class="btn transparent" id="sign-in-btn" />
              <a>Login</a>
            </div>
            <img
              src="C:\Users\195653\Desktop\Login\Front\img\logo.png"
              class="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
