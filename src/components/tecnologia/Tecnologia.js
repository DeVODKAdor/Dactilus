import React from "react";
import "./Tecnologia.css";

function Tecnologia(props) {
  return (
    <div className="tecnologia">
      <div className="img-container">
        <img src={props.imagem} className="imagem"></img>
      </div>
      <div className="tecnologia-content">
        <p className="nome-tecnologia">{props.nome}</p>
        <p className="descrição">{props.descricao}</p>
      </div>
    </div>
  );
}

export default Tecnologia;
