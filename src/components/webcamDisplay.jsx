import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS, Hands } from "@mediapipe/hands";
import PreProcessData from "../model/normalizeData";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import React from "react";
import "../styles/webcamStyle.css";

const WebcamDisplay = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const modelURL =
    "https://dactilusbucket.s3.sa-east-1.amazonaws.com/modeltfjs.json";
  const loadModel = async () => await tf.loadGraphModel(modelURL);
  const model = loadModel();
  useEffect(() => {
    const hands = new Hands({
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
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, []);

  function onResults(results) {
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
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
        model.then(
          (res) => {
          let data = PreProcessData(canvasElement, landmarks);
          let prediction = res.predict(data);
          console.log(data);
        },
          (err) => {
            console.log(err);
          }
        );
        
      }
      canvasCtx.restore();
    }
  }
  return (
    <div>
      <Webcam
        className="Webcam"
        audio={false}
        mirrored={true}
        ref={webcamRef}
      />
      <canvas className="Webcam" mirrored="true" ref={canvasRef}></canvas>
    </div>
  );
};

export default WebcamDisplay;
