import * as mpHands from "@mediapipe/hands";
import * as mpCamera from "@mediapipe/camera_utils";
import * as drawing from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import "./Mediapipe.css";
import { useEffect, useRef } from "react";

const Mediapipe = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
        let line = "";
        for (let i = 0; i < 21; i++) {
          if (i === 20) {
            line += landmarks[i].x + "," + landmarks[i].y + '\n';
            console.log(line);
            require("fs").writeFileSync("keypoint.csv", line)
            line = "";
          } else {
            line += landmarks[i].x + "," + landmarks[i].y + ",";
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
    <>
      <Webcam
        ref={webcamRef}
        mirrored={true}
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
    </>
  );
};

export default Mediapipe;
