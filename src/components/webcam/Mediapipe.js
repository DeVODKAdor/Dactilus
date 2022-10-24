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
import "./Mediapipe.css";
import { useEffect, useRef, useState } from "react";

const Mediapipe = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const MODEL_URL =
    "https://dactilusbucket.s3.sa-east-1.amazonaws.com/model/modeltfjs/model.json";
  const loadModel = async () => {
    const model = loadGraphModel(MODEL_URL);
    return model;
  };
  let palavra = "";
  const mostFrequent = (arr, n) => {
    // Sort the array
    arr.sort();

    // find the max frequency using linear
    // traversal
    let max_count = 1,
      res = arr[0];
    let curr_count = 1;

    for (let i = 1; i < n; i++) {
      if (arr[i] == arr[i - 1]) curr_count++;
      else curr_count = 1;

      if (curr_count > max_count) {
        max_count = curr_count;
        res = arr[i - 1];
      }
    }

    return res;
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
  }; // dei esse nome pq achei maneiro

  const [letra, setLetra] = useState("");
  let resultados = [];

  const onResults = (results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
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
                if (resultados.length === 50) {
                  palavra += cypher[mostFrequent(resultados, 50)];
                  setLetra(palavra);
                  resultados = [];
                }
              },
              (err) => {
                console.log(err);
              }
            );
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
        <div className="container text-center align-self-center">
          <div className="exibidor-texto">
            <h1>
              <strong>TRADUÇÃO</strong>
            </h1>
            <h2>{letra}</h2>
          </div>
          <div className="exibidor-botoes">
            <div className="mt-4">
              <div className="container-md text-center">
                <div className="row justify-content-center">
                  <div className="col-sm">
                    <img
                      src={lixeira}
                      onClick={() => {
                        setLetra("");
                      }}
                    ></img>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm justify-content-center">
                    <img
                      src={apagar}
                      onClick={() => {
                        const novaPalavra = letra.slice(0, -1);
                        setLetra(novaPalavra);
                      }}
                    ></img>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm">
                    <img src={espacamento}></img>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm">
                    <img src={quadrados}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mediapipe;
