import "../components/styles.css";
import React, { useState, useEffect } from "react";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
const OPTIONS = {
  filename: "video",
  fileType: "web3",
  codec: { audio: "aac" | "opus", video: "av1" | "avc" | "vp8" },
  width: 1920,
  height: 1080,
};

export default function WebCam(props) {
  const navigate = useNavigate();
  const recordWebcam = useRecordWebcam(OPTIONS);

  const hoursMinSecs = { minutes: 7, seconds: 30 };
  const [isRecord, setRecord] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      //1 second = 1000 millisecond
    }, 450000);
  });

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <p>Camera status: {recordWebcam.status}</p>
      <CountDownTimer hoursMinSecs={hoursMinSecs} />
      <div class="webcam">
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.OPEN ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={recordWebcam.open}
        >
          Open camera
        </button>
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.OPEN ||
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
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
          onClick={recordWebcam.download}
        >
          Download
        </button>
      </div>
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
