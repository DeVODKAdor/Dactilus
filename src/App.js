import React from "react";
import "./App.css";
import * as tf from '@tensorflow/tfjs'
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import WebcamDisplay from "./components/webcamDisplay";

function App() {
  return (
    <div className="App">
      <WebcamDisplay></WebcamDisplay>
    </div>
  );
}

export default App;
