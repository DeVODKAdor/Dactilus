import React from "react"
import Webcam from "react-webcam"
import { Hands } from '@mediapipe/hands'
import * as MediapipeHands from '@mediapipe/hands'
import * as CameraUtils from '@mediapipe/camera_utils'
import * as DrawingUtils from '@mediapipe/drawing_utils'
import { useRef, useEffect } from "react"

const WebcamDisplay = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    var camera = null
    const connect = window.drawConnectors

    function onResults(results) {
        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.multiHandLansmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                connect(canvasCtx, landmarks, MediapipeHands.HAND_CONNECTIONS,
                    { color: '#00FF00', lineWidth: 5 });
                DrawingUtils.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            }
        }
        canvasCtx.restore()
    }

    useEffect(() => {
        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        })

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults(onResults)

        if (typeof webcamRef.current !== 'undefined' && typeof webcamRef.current !== 'null') {
            camera = new CameraUtils.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await hands.send({ image: webcamRef.current.video })
                },
                width: 640,
                height: 480
            })
            camera.start()
        }
    })

    return (
        <div>
            <Webcam ref={webcamRef} mirrored={true} hidden={true} style={{
                position: 'absolute',
                marginRight: 'auto',
                marginLeft: 'auto',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 9,
                width: 640,
                height: 480
            }} />
            <canvas ref={canvasRef} style={{
                position: 'absolute',
                marginRight: 'auto',
                marginLeft: 'auto',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 9,
                width: 640,
                height: 480
            }}>
            </canvas>
        </div>

    )
}



export default WebcamDisplay;