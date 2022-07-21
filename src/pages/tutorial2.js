import React, { useState, useEffect } from "react";
import CountDownTimer from "../components/Timer";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      setTimeout(() => {
        recordWebcam.stop();
        //recordWebcam.getRecording();
        //1 second = 1000 millisecond
      }, 420000);
    }
    if (recordWebcam.status === CAMERA_STATUS.PREVIEW) {
      recordWebcam.download();
    }
  });

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <button class="instructionBtn" onClick={toggleModal}>
        Click to see Insrtuctions{" "}
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>My modal dialog.</div>
        <button class="closerBtn" onClick={toggleModal}>
          Close modal
        </button>
      </Modal>
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

export default Tutorial2;
