import React from "react";
import { Link } from "react-router-dom";
import "./Popup.css";
import setinha from "../../assets/images/arrow.png"

function Popup(props) {
  return (
    <div className="popup-container" style={{visibility: props.visivel}}>
      <img className="setinha" src={setinha}/>
      <div className="popup">
        <Link to="/traducao-libras" className="opcao">Traduzir Libras para português</Link>
        <div className="linha" />
        <Link to="/traducao-portugues" className="opcao">Traduzir português para Libras</Link>
      </div>
    </div>
  );
}

export default Popup;
