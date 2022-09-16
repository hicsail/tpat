import "../components/styles.css";
import { useState, useContext, useRef, useEffect } from "react";
import { data } from "../data";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import {
  CAMERA_STATUS,
  RecordWebcamOptions,
  RecordWebcam,
  WebcamRenderProps,
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
import Box from "@mui/material/Box";

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
const TAG = "Webcam.tsx ";

export default function WebcamExperimental2(props: Props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useState<WebcamRenderProps | null>(null);
  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };
  const [uploading, setUploading] = useState(false);
  const [recording, setRecording] = useState(false);

  const task = props.task;

  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    console.log("opening cam");
    //opens camera and shows camera view
    openButtonRef.current?.click();
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
    const metadata = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      taskId: task.id.toString(),
      university: user.university,
    };
    await uploadTos3(videoBlob, metadata);
    setUploading(false);
  };

  /* 
  steps in endRecordingSession
    1. stop recording
    2. get recording
       a. if tutorial, download video
       b. if task, upload video to s3, 
    3. navigate  home
    */
  const endRecordingSession = async (webcamRenderProps: WebcamRenderProps) => {
    if (webcamRenderProps.status === CAMERA_STATUS.RECORDING) {
      await webcamRenderProps.stop();
    }

    if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
      webcamRenderProps.download();
    } else {
      const blob = await webcamRenderProps.getRecording();
      if (blob) {
        await uploadTask(blob);
      } else {
        console.log("could not get recording. Blob:", blob);
      }
      console.log("blob", blob, "blob==undefined", blob == undefined);
    }
    navigate("/");
  };

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
              <RecordWebcam
                getStatus={onWebcamStatusChange}
                options={{ recordingLength: RECORDING_TIME_LIMIT }}
                render={(props: WebcamRenderProps) => {
                  return (
                    <div>
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
                      <div>
                        <Button
                          ref={openButtonRef}
                          variant="contained"
                          disabled={props.status !== CAMERA_STATUS.CLOSED}
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
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack>
            <Stack direction={"row"} justifyContent={"space-around"}></Stack>
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
    </Box>
  );
}
