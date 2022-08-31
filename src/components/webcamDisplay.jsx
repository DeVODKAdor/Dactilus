import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS, Hands } from "@mediapipe/hands";
import PreProcessData from "../model/normalizeData";
import { getStorage, ref } from "firebase/storage";
import * as tf from '@tensorflow/tfjs'


async function WebcamDisplay() {

  const videoElement = document.getElementsByClassName("input_video")[0];
  const canvasElement = document.getElementsByClassName("output_canvas")[0];
  const canvasCtx = canvasElement.getContext("2d");
  const storage = getStorage();
  const model = ref(storage, 'gs://dactilus-12bc4.appspot.com/model_dactilus/model.json');
  const ai = await tf.loadLayersModel('https://storage.cloud.google.com/dactilus-12bc4.appspot.com/model_dactilus/model.json')
  function onResults(results) {
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
        let data = PreProcessData(canvasElement, landmarks)
        const predict = ai.predict(data)
        console.log(predict)
      }
      canvasCtx.restore();
    }
  }

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

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
  return (
    <>
      <canvas image={videoElement}></canvas>
    </>
  )
}

export default WebcamDisplay;
