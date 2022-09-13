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
import {
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { RECORDING_TIME_LIMIT } from "../config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const OPTIONS = {
  filename: "video",
  fileType: "webm",
  codec: { audio: "aac", video: "av1" },
  width: 1920,
  height: 1080,
} as RecordWebcamOptions;

// enum for where webcam is being used.
export enum WEBCAM_CONTEXT {
  TUTORIAL,
  TASK,
}

export interface Props {
  task: typeof data[0]; //TODO define task interface
  context?: WEBCAM_CONTEXT; // where webcam is being used. Video upload procedure of this component depends on the context (tutorial or task).
}

export default function Webcam(props: Props) {
  // const id = props.id;
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const recordWebcam = useRecordWebcam(OPTIONS);

  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };
  const [isRecord, setRecord] = useState(false);
  const [uploading, setUploading] = useState(false);
  const task = props.task;

  useEffect(() => {
    // opening the camera
    setTimeout(() => {
      if (recordWebcam.status === CAMERA_STATUS.CLOSED) {
        recordWebcam.open();
      }
    }, 1000);

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
      }, RECORDING_TIME_LIMIT * 1000);
    }

    if (recordWebcam.status === CAMERA_STATUS.PREVIEW) {
      recordWebcam.close();

      if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
        recordWebcam.download();
        navigate("/");
      } else {
        uploadTask(recordWebcam);
      }
    }
  });

  async function uploadTask(recordWebcam: RecordWebcamHook) {
    setUploading(true);
    const blob = await recordWebcam.getRecording();
    const metadata = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      taskId: task.id.toString(),
      university: user.university,
    };
    // signature of getRecording is wrongfully defined as getRecording(): void in RecordWebcamHook
    //so blob has to be cast as any
    await uploadTos3(blob as any, metadata);
    setUploading(false);
    navigate("/");
  }

  return (
    <Box>
      <Grid container spacing={3} flex={1}>
        <Grid container xs={12} md={6}>
          <Container>
            {uploading ? (
              <Box>
                <CircularProgress />
                <Typography variant="h6" marginRight={2}>
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <video
                ref={recordWebcam.webcamRef}
                style={{
                  width: "100%",
                }}
                autoPlay
                muted
              />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Stack direction={"row"} alignItems="center">
                <Typography variant="body1" marginRight={2}>
                  Camera status:
                </Typography>
                <Chip
                  label={recordWebcam.status}
                  color={
                    recordWebcam.status === CAMERA_STATUS.RECORDING
                      ? "success"
                      : "default"
                  }
                />
              </Stack>

              {recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ? (
                <Stack direction={"row"} alignItems="center">
                  <Typography variant="body1" marginRight={2}>
                    Time left:
                  </Typography>
                  <CountDownTimer hoursMinSecs={hoursMinSecs} />
                </Stack>
              ) : (
                <Typography variant="h6">
                  {"Time Limit: " +
                    Math.floor(RECORDING_TIME_LIMIT / 60) +
                    "minutes"}
                </Typography>
              )}
            </Stack>
            <Stack spacing={10} mt={5}>
              <Stack>
                <Typography variant="h6">
                  The problem you have chosen is:
                </Typography>
                <Typography variant="body1">{task.problem}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6">
                  Your task is to do the following:
                </Typography>
                {task.task.map((t) => (
                  <Typography variant="body1">{" >    " + t}</Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Stack mt={5}>
        <Button
          variant="contained"
          disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
          onClick={() => {
            recordWebcam.stop();
            setRecord(!isRecord);
          }}
          name="upload"
        >
          Submit recording
        </Button>
      </Stack>
    </Box>
  );
}
