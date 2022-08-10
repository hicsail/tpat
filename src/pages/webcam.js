import "../components/styles.css";
import React, { useState, useEffect } from "react";
import { data } from "../data";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
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

  const hoursMinSecs = { minutes: 5, seconds: 0 };
  const [isRecord, setRecord] = useState(false);
  useEffect(() => {
    // opening the camera
    setTimeout(() => {
      if (recordWebcam.status === CAMERA_STATUS.CLOSED) {
        recordWebcam.open();
      }
      //1 second = 1000 millisecond
    }, 1000);

    // page timer itself, navigate back at x mins 10 seconds when camera is recording
    // however, timer will start counting down with 5 extra second for user to do it
    setTimeout(() => {
      navigate("/");
      //310000
    }, 310000);

    // When camera is open, it will immediately start recording
    if (recordWebcam.status === CAMERA_STATUS.OPEN) {
      setTimeout(() => {
        recordWebcam.start();
        //recordWebcam.getRecording();
        //1 second = 1000 millisecond
        //301000
      }, 0);
    }

    // video timer itself, stops at x mins
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      setTimeout(() => {
        recordWebcam.stop();
        //1 second = 1000 millisecond
        //301000
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
      {recordWebcam.status === CAMERA_STATUS.OPEN ||
      recordWebcam.status === CAMERA_STATUS.RECORDING ? (
        <CountDownTimer hoursMinSecs={hoursMinSecs} />
      ) : (
        <p>Time Limit: 5 minutes</p>
      )}

      <div class="webcam">
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
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          display: "inline-block",
          alignContent: "baseline",
        }}
      >
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
              display: "inline-block",
              width: "50%",
            }}
            autoPlay
            muted
          />
          <div
            style={{
              display: "inline-block",
              width: "50%",
              paddingLeft: "2%",

              overflow: "scroll",
              paddingBottom: "2%",
            }}
          >
            <h3
              style={{
                fontWeight: "bold",
              }}
            >
              The problem you have chosen is:
            </h3>
            <h3 style={{ fontWeight: "normal" }}>{data[id].problem}</h3>
            {data[id].imgURL !== "#" ? (
              <img
                style={{ height: "150px", paddingLeft: "2%" }}
                src={data[id].imgURL}
                alt="task visualization"
              />
            ) : null}
            <h3
              style={{
                paddingTop: "3%",
                paddingBottom: "1%",
                fontWeight: "bold",
              }}
            >
              Your task is to do the following:
            </h3>
            <div class="task">
              <ul>
                <li>{data[id].task[0]}</li>
                <br></br>
                <li>{data[id].task[1]}</li>
                <br></br>
                <li>{data[id].task[2]}</li>
                <br></br>
                <li>{data[id].task[3]}</li>
              </ul>
            </div>
          </div>
        </WaterMark>
      </div>

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
