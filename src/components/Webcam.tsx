import "../components/styles.css";
import React, { useState, useEffect, useContext } from "react";
import { data } from "../data";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import {
  useRecordWebcam,
  CAMERA_STATUS,
  RecordWebcamOptions,
  RecordWebcamHook,
} from "react-record-webcam";
import { uploadTos3 } from "../utils/videoUploadUtils";
import { UserContext } from "../store/UserContext";

const OPTIONS = {
  filename: "video",
  fileType: "webm",
  codec: { audio: "aac", video: "av1" },
  width: 1920,
  height: 1080,
} as RecordWebcamOptions;

export interface Props {
  id: number;
}

export default function Webcam(props: Props) {
  const id = props.id;
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const recordWebcam = useRecordWebcam(OPTIONS);

  const hoursMinSecs = { minutes: 5, seconds: 0 };
  const [isRecord, setRecord] = useState(false);

  useEffect(() => {
    // opening the camera
    setTimeout(() => {
      if (recordWebcam.status === CAMERA_STATUS.CLOSED) {
        recordWebcam.open();
      }
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
      }, 0);
    }

    // video timer itself, stops at x mins
    if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
      setTimeout(() => {
        recordWebcam.stop();
      }, 301000);
    }

    if (recordWebcam.status === CAMERA_STATUS.PREVIEW) {
      recordWebcam.close();
      recordWebcam.download();
      uploadTask(recordWebcam);
    }
  });

  async function uploadTask(recordWebcam: RecordWebcamHook) {
    const blob = await recordWebcam.getRecording();
    const metadata = {
      name: user.name,
      email: user.email,
      taskId: props.id.toString(),
    };
    // signature of getRecording is wrongfully defined as getRecording(): void in RecordWebcamHook
    //so blob has to be cast as any
    await uploadTos3(blob as any, metadata);
    //TODO show upload success message
    navigate("/");
  }

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <p>Camera status: {recordWebcam.status}</p>
      {recordWebcam.status === CAMERA_STATUS.OPEN ||
      recordWebcam.status === CAMERA_STATUS.RECORDING ? (
        <CountDownTimer hoursMinSecs={hoursMinSecs} />
      ) : (
        <p>Time Limit: 5 minutes</p>
      )}

      <div className="webcam">
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
          onClick={() => {
            recordWebcam.stop();
            setRecord(!isRecord);
          }}
          name="upload"
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
        <video
          ref={recordWebcam.webcamRef}
          style={{
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
          <div className="task">
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
