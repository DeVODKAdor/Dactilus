import * as mpHands from "@mediapipe/hands";
import * as mpCamera from "@mediapipe/camera_utils";
import * as drawing from "@mediapipe/drawing_utils";
import * as tf from "@tensorflow/tfjs";
import apagar from "../../assets/images/botoes/apagar.png";
import espacamento from "../../assets/images/botoes/espacamento.png";
import lixeira from "../../assets/images/botoes/lixeira.png";
import quadrados from "../../assets/images/botoes/quadrados-abc.png";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import Webcam from "react-webcam";
import mostFrequent from "../../utils/mostFrequent";
import "./Mediapipe.css";
import { useEffect, useRef, useState } from "react";

const Mediapipe = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const maxIndex = 50;

  const [letra, setLetra] = useState([]);

  const MODEL_URL =
    "https://dactilusbucket.s3.sa-east-1.amazonaws.com/model/modeltfjs/model.json";
  const loadModel = async () => {
    const model = loadGraphModel(MODEL_URL);
    return model;
  };
  const model = loadModel();
  const cypher = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
    12: "M",
    13: "N",
    14: "O",
    15: "P",
    16: "Q",
    17: "R",
    18: "S",
    19: "T",
    20: "U",
    21: "V",
    22: "W",
    23: "X",
    24: "Y",
    25: "Z",
  };

  let resultados = [];

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawing.drawConnectors(canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, {
          color: "#79BDEF",
          lineWidth: 5,
        });
        drawing.drawLandmarks(canvasCtx, landmarks, {
          color: "#00FF00",
          lineWidth: 2,
        });
        let predict = [];
        for (let i = 0; i < 21; i++) {
          predict.push(landmarks[i].x);
          predict.push(landmarks[i].y);
          if (i === 20) {
            model.then(
              (model) => {
                const prediction = tf.tensor(predict);
                const expandedPrediction = prediction.expandDims(0);
                const result = model.predict(expandedPrediction);
                const array = result.dataSync();
                const final = array.indexOf(Math.max(...array));
                resultados.push(final);
                predict = [];
              },
              (err) => {
                console.log(err);
              }
            );
            if (resultados.length === maxIndex) {
              let novaLetra = cypher[mostFrequent(resultados, maxIndex)];
              setLetra((arr) => [...arr, novaLetra]);
              resultados = [];
            }
          }
        }
      }
    }
    canvasCtx.restore();
  };

  useEffect(() => {
    const hands = new mpHands.Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      let camera = new mpCamera.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div className="container">
      <div>
        <Webcam
          ref={webcamRef}
          mirrored={true}
          hidden={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
      <div className="exibidor">
        <h1>
          <strong>TRADUÇÃO</strong>
        </h1>
        <div className="container text-center">
          <div className="exibidor-texto">
            <div className="container-lg">
              <h2>{letra}</h2>
            </div>
          </div>
          <div className="exibidor-botoes">
            <div className="container-sm text-center pl-4">
              <div className="row justify-content-center">
                <div className="col">
                  <a>
                    <img
                      src={lixeira}
                      onClick={() => {
                        setLetra([]);
                      }}
                    ></img>
                  </a>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col justify-content-center">
                  <a>
                    <img
                      src={apagar}
                      onClick={() => {
                        setLetra((arr) => arr.slice(0, arr.length - 1));
                      }}
                    ></img>
                  </a>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col">
                  <a>
                    <img
                      src={espacamento}
                      onClick={() => {
                        setLetra((arr) => [...arr, " "]);
                      }}
                    ></img>
                  </a>
                </div>
              </div>
              <div className="row justify-content-center">
                <a
                  href="https://www.libras.com.br/ct__images/artigos/alfabeto-manual/alfabeto-manual.png"
                  target={"_blank"}
                >
                  <div className="col">
                    <img src={quadrados}></img>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mediapipe;
