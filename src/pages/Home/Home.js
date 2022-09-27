import React from "react";
import Carrossel from "../../components/carrossel/Carrossel";
import Titulo from "../../components/titulos/Titulo";
import Card from "../../components/card/Card";
import Tecnologia from "../../components/tecnologia/Tecnologia";
import python from "../../assets/images/tecnologias/python.png";
import mediapipe from "../../assets/images/tecnologias/mediapipe.png";
import tensorflow from "../../assets/images/tecnologias/tensorflow.png";
import Integrante from "../../components/integrante/Integrante";
import Arinaldo from "../../assets/images/equipe/arinaldo.png";
import Davi from "../../assets/images/equipe/davi.png";
import Flavia from "../../assets/images/equipe/flavia.png";
import Navbar from "../../components/navbar/Navbar";
import Popup from "../../components/popup/Popup";
import "./Home.css"

function Home() {
  const exemplo =
    "Lorem ipsum ullamcorper suspendisse luctus fuscevestibulum velit bibendum sem elementum maecenas class, dolor maecenas ";
  return (
    <>
      <Navbar />
      <Carrossel />
      <Titulo texto="PROJETO DACTILUS" />
      <div className="container">
        <Card
          numero="1"
          texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"
        />
        <Card
          numero="2"
          texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"
        />
        <Card
          numero="3"
          texto="Lorem ipsum ullamcorper suspendisse luctus fusce vestibulum velit bibendum"
        />
      </div>
      <Titulo texto="TECNOLOGIAS UTILIZADAS" />
      <div className="container">
        <Tecnologia imagem={python} nome="Python" descricao={exemplo} />
        <Tecnologia imagem={tensorflow} nome="Tensorflow" descricao={exemplo} />
        <Tecnologia imagem={mediapipe} nome="Mediapipe" descricao={exemplo} />
      </div>
      <Titulo texto="SOBRE A EQUIPE" />
      <div className="container">
        <Integrante
          membro={Flavia}
          nome="Flávia Silva"
          descricao="A designer, responsável por toda a estética do projeto"
        />
        <Integrante
          membro={Davi}
          nome="Davi Moreira"
          descricao="O programador, responsável por toda a lógica do projeto"
        />
        <Integrante
          membro={Arinaldo}
          nome="Arinaldo Aquino"
          descricao="O analista, responsável por toda a pesquisa e documentação do projeto"
        />
      </div>
    </>
  );
}

export default Home;
