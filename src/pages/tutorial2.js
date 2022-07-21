import React, { useState, useEffect } from "react";
import CountDownTimer from "../components/Timer";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";

const OPTIONS = {
  filename: "video",
  fileType: "webm",
  codec: { audio: "aac" | "opus", video: "av1" | "avc" | "vp8" },
  width: 1920,
  height: 1080,
};

function Tutorial2() {
  const hoursMinSecs = { minutes: 7, seconds: 2 };
  const [isRecord, setRecord] = useState(false);
  const recordWebcam = useRecordWebcam(OPTIONS);
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
          onClick={recordWebcam.open}
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
    </div>
  );
}

export default Tutorial2;
