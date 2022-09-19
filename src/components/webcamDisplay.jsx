import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS, Hands } from "@mediapipe/hands";
import PreProcessData from "../model/normalizeData";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import React from "react";
import SashiDoTeachableMachine from "@sashido/teachablemachine-node";
import "../styles/webcamStyle.css";

const WebcamDisplay = () => {
  const URL = "https://teachablemachine.withgoogle.com/models/fPpOh734r/";

  let model, webcam, labelContainer, maxPredictions;

  // Load the image model and setup the webcam
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    maxPredictions = model.getTotalClasses();
    const flip = false; // whether to flip the webcam
    webcam = new tmImage.Webcam(556, 599, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }
};

export default WebcamDisplay;
