import React, { useState, useEffect } from "react";
import CountDownTimer from "../components/Timer";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
import { useNavigate } from "react-router-dom";

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
    }, 425000);

    // video timer itself, stops at 7 mins
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      setTimeout(() => {
        recordWebcam.stop();
        //recordWebcam.getRecording();
        //1 second = 1000 millisecond
      }, 421000);
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
      <button class="instructionBtn" onClick={toggleModal}>
        Click to see Insrtuctions
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>
          <h2>Timer on the page</h2>
          <p>
            Your camera will automatically start and open when you get onto the
            page / auto-directed to the page. Once you are on the page, your
            camera will automatically open, and start recording shortly after.
            You will also be able to see the timer starting to count down. The
            video will stop after the task timer/timer runs out, but you are
            also able to stop recording once you are finished. The video will
            automatically download to your local computer, and redirect you back
            to the homepage.
          </p>
        </div>
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
