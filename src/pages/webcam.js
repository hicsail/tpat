import "../components/styles.css";
import React, { useState, useEffect } from "react";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
//import videojs from "video.js";
import "videojs-watermark";
//import ReactWaterMark from "react-watermark-component";
import WaterMark from "watermark-component-for-react";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
const OPTIONS = {
  filename: "video",
  fileType: "webm",
  codec: { audio: "aac" | "opus", video: "av1" | "avc" | "vp8" },
  width: 1920,
  height: 1080,
};

export default function WebCam(props) {
  const navigate = useNavigate();
  const recordWebcam = useRecordWebcam(OPTIONS);

  /**First watermarking method */
  const ReactWaterMark = require("react-watermark-component");

  const text = `This is a watermarking test`;

  const options = {
    chunkWidth: 200,
    chunkHeight: 60,
    textAlign: "left",
    textBaseline: "bottom",
    globalAlpha: 0.17,
    font: "14px Microsoft Yahei",
    rotateAngle: -0.26,
    fillStyle: "#666",
  };

  /**End of first watermarking method */
  /**Second watermarking method */
  const content = "this is a watermarking test";
  /**End of second watermarking method */

  const hoursMinSecs = { minutes: 7, seconds: 1 };
  const [isRecord, setRecord] = useState(false);
  useEffect(() => {
    // opening the camera
    setTimeout(() => {
      if (recordWebcam.status === CAMERA_STATUS.CLOSED) {
        recordWebcam.open();
      }
      //1 second = 1000 millisecond
    }, 1000);

    // page timer itself, navigate back at 7 mins 5 seconds when camera is recording
    setTimeout(() => {
      navigate("/");
      //1 second = 1000 millisecond
    }, 305000);

    // video timer itself, stops at 7 mins
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      setTimeout(() => {
        recordWebcam.stop();
        //recordWebcam.getRecording();
        //1 second = 1000 millisecond
      }, 301000);
    }
    if (recordWebcam.status === CAMERA_STATUS.PREVIEW) {
      setTimeout(() => {
        navigate("/");
        //1 second = 1000 millisecond
      }, 1000);
      recordWebcam.close();
      recordWebcam.download();
    }
  });

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <p>Camera status: {recordWebcam.status}</p>
      {recordWebcam.status === CAMERA_STATUS.RECORDING ? (
        <CountDownTimer hoursMinSecs={hoursMinSecs} />
      ) : (
        <p>Time Limit: 7 minutes</p>
      )}

      <div class="webcam">
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.OPEN ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={() => {
            recordWebcam.start();
            recordWebcam.open();
          }}
        >
          Open camera
        </button>
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.CLOSED ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={() => {
            recordWebcam.start();
            setRecord(!isRecord);
          }}
        >
          Start recording
        </button>
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
          onClick={() => {
            recordWebcam.stop();
            setRecord(!isRecord);
          }}
        >
          Stop recording
        </button>
      </div>
      <WaterMark content={content}>
        <video
          ref={recordWebcam.webcamRef}
          style={{
            display: `${
              recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING
                ? "block"
                : "none"
            }`,
          }}
          autoPlay
          muted
        />
      </WaterMark>
      <video
        ref={recordWebcam.previewRef}
        style={{
          display: `${
            recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
          }`,
        }}
        controls
      />
    </div>
  );
}
