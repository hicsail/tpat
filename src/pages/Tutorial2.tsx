import React, { useState, useEffect, useContext } from "react";
import CountDownTimer from "../components/Timer";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { uploadTos3 } from "../utils/videoUploadUtils";
import { UserContext } from "../store/UserContext";
import Webcam from "../components/Webcam";
// import Modal from "@mui/material/Modal";

Modal.setAppElement("#root");

function Tutorial2() {
  const hoursMinSecs = { minutes: 7, seconds: 2 };
  const [isRecord, setRecord] = useState(false);
  const { user } = useContext(UserContext);
  // const [mode, setMode] = useState<"preparing" | "recording">("preparing");
  const taskIndex = 0;

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <button className="instructionBtn" onClick={toggleModal}>
        Click to see Instructions
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
          <h2>Timer on the task</h2>
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
        <button className="closerBtn" onClick={toggleModal}>
          Close modal
        </button>
      </Modal>
      <Webcam id={taskIndex} />
    </div>
  );
}

export default Tutorial2;
