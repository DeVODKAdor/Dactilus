import React from "react";
import "./TraducaoLibras.css";
import Navbar from "../../components/navbar/Navbar";
import Mediapipe from "../../components/webcam/Mediapipe";

function TraducaoLibras() {
  const texto =
    "Posicione-se entre 10 a 80cm em frente à câmera num lugar bem iluminado e realize o gesto que gostaria de traduzir. \n Lembre-se de colocar sua mão DIREITA de forma que ocupe quase todo o espaço da câmera";
  return (
    <>
      <Navbar />
      <p className="aviso">{texto}</p>
      <div className="display">
        <Mediapipe />
      </div>
    </>
  );
}

export default TraducaoLibras;
