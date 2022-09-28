import { argMax, dispose, loadLayersModel, softmax } from "@tensorflow/tfjs";
import { fromPixels } from "@tensorflow/tfjs-core/dist/ops/browser";
import * as tf from "@tensorflow/tfjs";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

function WebcamDisplay() {
  const URL =
    "https://teachablemachine.withgoogle.com/models/fPpOh734r/model.json";

  const webcamRef = useRef(null);
  const [letra, setLetra] = useState("");
  let palavra = ""

  const loadModel = async () => {
    const model = await loadLayersModel(URL);
    setInterval(() => {
      detect(model);
    }, 5000);
  };

  const labelMap = {
    0: {letra: 'A'},
    1: {letra: 'B'},
    2: {letra: 'C'},
    3: {letra: 'D'},
    4: {letra: 'E'},
    5: {letra: 'F'},
    6: {letra: 'G'},
    7: {letra: 'H'},
    8: {letra: 'I'},
    9: {letra: 'J'},
    10: {letra: 'K'},
    11: {letra: 'L'},
    12: {letra: 'M'},
    13: {letra: 'N'},
    14: {letra: 'O'},
    15: {letra: 'P'},
    16: {letra: 'Q'},
    17: {letra: 'R'},
    18: {letra: 'S'},
    19: {letra: 'T'},
    20: {letra: 'U'},
    21: {letra: 'V'},
    22: {letra: 'W'},
    23: {letra: 'X'},
    24: {letra: 'Y'},
    25: {letra: 'Z'},
    26: {letra: 'Eu te amo'}
  }

  const detect = async (model) => {
    if (
      typeof webcamRef.current !== null &&
      typeof webcamRef.current !== "undefined"
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const img = fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [224, 224]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await model.predict(expanded);
      let resultado = argMax(softmax(obj.dataSync())).dataSync()[0]
      
      palavra += labelMap[resultado]['letra']
      setLetra(palavra)
    }
  };

  useEffect(() => {
    loadModel()
  }, [])

  return (
    <>
      <Webcam ref={webcamRef} mirrored={true} style={{ width: 600, height: 600 }} />
      <div>{letra}</div>
    </>
  );
}

export default WebcamDisplay;
