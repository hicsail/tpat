import "../components/styles.css";
import { useState, useContext, useRef, useEffect } from "react";
import { data } from "../data";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import {
  CAMERA_STATUS,
  RecordWebcam,
  WebcamRenderProps,
} from "react-record-webcam";
import { uploadTos3 } from "../utils/videoUploadUtils";
import { UserContext } from "../store/UserContext";
import {
  Alert,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { RECORDING_TIME_LIMIT } from "../config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import { STORAGE_KEYS } from "../constants/storageKeys";
import PositionedSnackbar from "./PositionedSnackbar";

// enum for where webcam is being used.
export enum WEBCAM_CONTEXT {
  TUTORIAL,
  TASK,
}
export interface TaskHistory {
  [key: string]: { attempts: number; firstViewed: string };
}

export interface Props {
  task: typeof data[0]; //TODO define task interface
  taskHistory: { attempts: number; firstViewed: string };
  context?: WEBCAM_CONTEXT; // where webcam is being used. Video upload procedure of this component depends on the context (tutorial or task).
}
const TAG = "Webcam.tsx ";
const successfulUploadMessage = "Your recording was uploaded successfully";
const failedUploadMessage =
  "Your recording failed to upload. Please record again.";

export default function Webcam(props: Props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useState<WebcamRenderProps | null>(null);
  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };
  const [uploading, setUploading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [uploadResultsMessage, setUploadResultsMessage] = useState("");

  const task = props.task;
  const taskId = task.id;
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    //opens camera and shows camera view
    openButtonRef.current?.click();

    //stop camera when component unmounts
    return () => {
      stopButtonRef.current?.click();
    };
  }, []);

  const onWebcamStatusChange = (status: string) => {
    console.log("status", status);
    if (!recording && status === CAMERA_STATUS.OPEN) {
      //starts webcam recording
      startButtonRef.current?.click();
      setRecording(true);
    } else if (status === CAMERA_STATUS.PREVIEW) {
      //stops recording and submits video
      stopButtonRef.current?.click();
    }
  };

  const uploadTask = async (videoBlob: Blob) => {
    setUploading(true);

    const netPrepTimeInMilliseconds =
      new Date().getTime() - new Date(props.taskHistory.firstViewed).getTime();
    const netPrepTimeInHours = netPrepTimeInMilliseconds / 3600000;
    console.log("netPrepTimeInHours", netPrepTimeInHours);

    const metadata = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      taskId: task.id.toString(),
      university: user.university,
      attempts: props.taskHistory.attempts.toString(),
      firstViewed: props.taskHistory.firstViewed,
      netPrepTimeInHours: netPrepTimeInHours.toString(),
    };
    const uploadResults = await uploadTos3(videoBlob, metadata);
    setUploading(false);
    setUploadResultsMessage(
      uploadResults ? successfulUploadMessage : failedUploadMessage
    );
  };

  /* 
  steps in endRecordingSession
    1. stop recording
    2. get recording
       a. if tutorial, download video
       b. if task, upload video to s3, 
  */
  const endRecordingSession = async (webcamRenderProps: WebcamRenderProps) => {
    if (webcamRenderProps.status === CAMERA_STATUS.RECORDING) {
      await webcamRenderProps.stop();
    }

    if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
      webcamRenderProps.download();
      setUploadResultsMessage(successfulUploadMessage);
    } else {
      //TODO prompt a re-recording here if blob is faulty
      const blob = await webcamRenderProps.getRecording();
      if (blob) {
        console.log(TAG, "size of video recording:", blob.size);
        await uploadTask(blob);
      } else {
        console.log("could not get recording. Blob:", blob);
        setUploadResultsMessage(failedUploadMessage);
      }
    }
  };

  const onDismissSnackbar = () => {
    console.log(TAG, "navigating back");
    navigate("/");
  };

  return (
    <Box>
      <Grid container spacing={3} flex={1}>
        <Grid container xs={12} md={6} key="1">
          <Container>
            {uploading ? (
              <Box>
                <CircularProgress />
                <Typography variant="h6" marginRight={2}>
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <RecordWebcam
                getStatus={onWebcamStatusChange}
                options={{
                  codec: { audio: "aac", video: "av1" },
                  recordingLength: RECORDING_TIME_LIMIT,
                }}
                //TODO change codec audio to aac
                render={(props: WebcamRenderProps) => {
                  return (
                    <div>
                      <Stack
                        direction={"row"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        mb={3}
                      >
                        <Stack direction={"row"} alignItems="center">
                          <Typography variant="body1" marginRight={2}>
                            Camera status:
                          </Typography>
                          <Chip
                            label={props.status}
                            color={
                              props.status === CAMERA_STATUS.RECORDING
                                ? "success"
                                : "default"
                            }
                          />
                        </Stack>
                        {props.status === CAMERA_STATUS.OPEN ||
                        props.status === CAMERA_STATUS.RECORDING ? (
                          <>
                            {recording && (
                              <Stack direction={"row"} alignItems="center">
                                <Typography variant="body1" marginRight={2}>
                                  Time left:
                                </Typography>

                                <CountDownTimer hoursMinSecs={hoursMinSecs} />
                              </Stack>
                            )}
                          </>
                        ) : (
                          <Typography variant="h6">
                            {"Time Limit: " +
                              Math.floor(RECORDING_TIME_LIMIT / 60) +
                              "minutes"}
                          </Typography>
                        )}
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        mb={3}
                      >
                        <Button
                          ref={openButtonRef}
                          variant="contained"
                          //uploadResultsMessage is set after an upload. prevent user's from starting camera again after an upload
                          disabled={
                            props.status !== CAMERA_STATUS.CLOSED ||
                            uploadResultsMessage !== ""
                          }
                          onClick={props.openCamera}
                        >
                          Open camera
                        </Button>
                        <Button
                          ref={startButtonRef}
                          variant="contained"
                          disabled={props.status !== CAMERA_STATUS.OPEN}
                          onClick={() => {
                            props.start();
                            setRecording(true);
                          }}
                        >
                          Start recording
                        </Button>

                        <Button
                          ref={stopButtonRef}
                          variant="contained"
                          disabled={
                            props.status !== CAMERA_STATUS.RECORDING &&
                            props.status !== CAMERA_STATUS.PREVIEW
                          }
                          onClick={() => {
                            endRecordingSession(props);
                          }}
                        >
                          Submit recording
                        </Button>
                      </Stack>
                    </div>
                  );
                }}
              />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6} key="2">
          <Stack>
            <Stack direction={"row"} justifyContent={"space-around"}></Stack>
            <Stack spacing={10} mt={5}>
              <Stack>
                <Typography variant="h6">
                  The problem you have chosen is:
                </Typography>
                <Typography variant="body1">{task.problem}</Typography>
                {task.imgURL && (
                  <div className="img-container">
                    <img
                      style={{
                        width: "250%",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                      src={task.imgURL}
                      alt="task visualization"
                    />
                  </div>
                )}
              </Stack>
              <Stack>
                <Typography variant="h6">
                  Your task is to do the following:
                </Typography>
                <Typography variant="body1" fontWeight={800}>
                  {task.task}
                </Typography>
                <Typography variant="h6" mt={2} fontWeight={800}>
                  Remember to:
                </Typography>
                {task.prompts.map((t) => (
                  <Typography variant="body1">{" >    " + t}</Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <PositionedSnackbar
        open={uploadResultsMessage != ""}
        message={uploadResultsMessage}
        onDismiss={onDismissSnackbar}
      />
    </Box>
  );
}
