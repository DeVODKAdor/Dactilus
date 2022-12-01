import React from "react";
import Titulo from "../../components/titulos/Titulo";
import Cards from "../../components/card/Card";
import Tecnologia from "../../components/tecnologia/Tecnologia";
import python from "../../assets/images/tecnologias/python.png";
import mediapipe from "../../assets/images/tecnologias/mediapipe.png";
import tensorflow from "../../assets/images/tecnologias/tensorflow.png";
import equipe from "../../assets/images/equipe/equipe.jpeg";
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
            src: equipe,
          },
        ]}
      />
      <Titulo texto="PROJETO DACTILUS" />
      <div className="container">
        <Cards
          numero="Quem somos"
          texto="Somos um software que visa o auxílio na comunicação entre pessoas surdas e ouvintes"
        />
        <Cards
          numero="Problemática"
          texto="No Brasil, há cerca de 10 (dez) milhões de pessoas surdas. De outro lado, um quantitativo menor de ouvintes que sabem Libras, a linguagem utilizada pelos surdos. Esse fator gera dificuldades para a comunicação entre eles."
        />
        <Cards
          numero="Onde se aplica"
          texto="O software é aplicado em um contexto social, seja "
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
