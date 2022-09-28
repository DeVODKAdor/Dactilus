import React from "react";
import "./TraducaoLibras.css"
import Navbar from "../../components/navbar/Navbar";
import WebcamDisplay from "../../components/webcam/Webcam";

function TraducaoLibras() {
  const texto =
    "Posicione-se entre 10 a 80cm em frente à câmera num lugar bem iluminado e realize o gesto que gostaria de traduzir. ";
  return (
    <>
      <Navbar />
      <p className="aviso">{texto}</p>
      <div className="display">
        <WebcamDisplay />
      </div>
    </>
  );
}

export default TraducaoLibras;