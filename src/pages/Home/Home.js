import React from "react";
import Carrossel from "../../components/carrossel/Carrossel";
import Titulo from "../../components/titulos/Titulo";
import Card from "../../components/card/Card";
import Tecnologia from "../../components/tecnologia/Tecnologia";
import python from "../../assets/images/tecnologias/python.png";
import mediapipe from "../../assets/images/tecnologias/mediapipe.png";
import tensorflow from "../../assets/images/tecnologias/tensorflow.png";
import Integrantes from "../../components/integrante/Integrante";
import Navbar from "../../components/navbar/Navbar";
import { UncontrolledCarousel } from "reactstrap";
import "./Home.css";

function Home() {
  const descricaoMediapipe = `MediaPipe é uma biblioteca desenvolvida pelo Google. Através dessa biblioteca
    é possível realizar diversas atividades: Segmentação de selfie, Malha facial,
    rastreamento da mão detecção e rastreamento de objetos, detecção de rosto, entre outras
    atividades.`;
  const descricaoPython = `Python é uma linguagem de programação, utilizada para captar e reconhecer os
  sinais de libras realizado pelo usuário do software.`;
  const descricaoTensorflow = `TensorFlow é uma plataforma de código aberto para aprendizagem de máquina.
  Utilizamos essa plataforma para criar nossas próprias redes neurais. Empresas grandes
  como Google, Coca-Cola e Intel usam o TensorFlow.`;
  return (
    <>
      <Navbar />
      <UncontrolledCarousel
        items={[
          {
            altText: "Slide 1",
            caption: "Slide 1",
            key: 1,
            src: "https://picsum.photos/id/123/1200/600",
          },
          {
            altText: "Slide 2",
            caption: "Slide 2",
            key: 2,
            src: "https://picsum.photos/id/456/1200/600",
          },
          {
            altText: "Slide 3",
            caption: "Slide 3",
            key: 3,
            src: "https://picsum.photos/id/678/1200/600",
          },
        ]}
      />
      <Titulo texto="PROJETO DACTILUS"/>
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
        <Tecnologia imagem={python} nome="Python" descricao={descricaoPython} />
        <Tecnologia
          imagem={tensorflow}
          nome="Tensorflow"
          descricao={descricaoTensorflow}
        />
        <Tecnologia
          imagem={mediapipe}
          nome="Mediapipe"
          descricao={descricaoMediapipe}
        />
      </div>
      <Titulo texto="SOBRE A EQUIPE" />
      <div className="container">
        <Integrantes />
      </div>
    </>
  );
}

export default Home;
