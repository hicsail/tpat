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
import PositionedSnackbar from "./PositionedSnackbar";
import { ReactMediaRecorder } from "react-media-recorder";

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

const LiveVideoView = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return (
    <Stack style={{ width: "100%", height: "100%" }}>
      <video ref={videoRef} autoPlay controls={false} />
    </Stack>
  );
};

const VideoReplayView = ({
  mediaBlobUrl,
}: {
  mediaBlobUrl: string | undefined;
}) => {
  return (
    <Stack style={{ width: "100%", height: "100%" }}>
      <video src={mediaBlobUrl} autoPlay loop controls={false} />
    </Stack>
  );
};

const ErrorDisplay = ({ error }: { error: string }) => {
  var errorMessage = "";

  if (error) {
    switch (error) {
      case "permission_denied":
        errorMessage =
          "You have denied camera or microphone permissions to this site. You must enable permissions to record your video successfully";
        break;
      case "media_in_use":
        errorMessage =
          "Your camera or microphone is already in use. You must close other apps accessing them in order to record your video successfully";
        break;

      default:
        errorMessage =
          "There is an issue with your camera settings. You must fix it to record your video successfully, " +
          error;

        break;
    }
  }

  return (
    <>
      {errorMessage && (
        <Typography color={"red"}>{"Error:" + errorMessage}</Typography>
      )}
    </>
  );
};

const renderTask = (task: any) => {
  return (
    <Stack>
      <Stack direction={"row"} justifyContent={"space-around"}></Stack>
      <Stack spacing={10} mt={5}>
        <Stack>
          <Typography variant="h6">The problem you have chosen is:</Typography>
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
          {task.prompts.map((t: any) => (
            <Typography variant="body1">{" >    " + t}</Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function Webcam(props: Props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useState<WebcamRenderProps | null>(null);
  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };
  const [mode, setMode] = useState<"recording" | "uploading" | "completed">(
    "recording"
  );
  const [uploadResultsMessage, setUploadResultsMessage] = useState("");

  const task = props.task;
  const taskId = task.id;
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  var recordingTimer: NodeJS.Timeout;

  useEffect(() => {
    //opens camera and shows camera view
    startButtonRef.current?.click();

    recordingTimer = setTimeout(() => {
      stopButtonRef.current?.click();
    }, RECORDING_TIME_LIMIT * 1000);

    //stop camera and clear timeout when component unmounts
    return () => {
      recordingTimer && clearTimeout(recordingTimer);
      stopButtonRef.current?.click();
    };
  }, []);

  const uploadTask = async (videoBlob: Blob) => {
    setMode("uploading");

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
    setUploadResultsMessage(
      uploadResults ? successfulUploadMessage : failedUploadMessage
    );
    setMode("completed");
  };

  const downloadRecording = (mediaBlobUrl: string) => {
    const pathName = "teachertaskTutorial";
    try {
      // TODO test in safari
      // for Chrome
      const link = document.createElement("a");
      link.href = mediaBlobUrl;
      link.download = pathName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //   }
    } catch (err) {
      console.error(err);
    }
    setMode("completed");
  };

  /* 
  steps in endRecordingSession
    1. stop recording
    2. get recording
       a. if tutorial, download video
       b. if task, upload video to s3, 
  */
  const endRecordingSession = async (mediaBlobUrl: string, blob: Blob) => {
    if (blob) {
      console.log(TAG, "size of video recording:", blob.size);
      //download video when in tutorial
      if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
        downloadRecording(mediaBlobUrl);
      } else {
        await uploadTask(blob);
      }
    } else {
      console.log("could not get recording. Blob:", blob);
      setUploadResultsMessage(failedUploadMessage);
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
            {mode === "recording" && (
              <ReactMediaRecorder
                video
                onStop={(mediaBlobUrl, blob) => {
                  console.log(
                    "On stop called. mediaBlobUrl",
                    mediaBlobUrl,
                    "blob",
                    blob
                  );
                  setMode("uploading");
                  endRecordingSession(mediaBlobUrl, blob);
                }}
                render={({
                  status,
                  startRecording,
                  stopRecording,
                  mediaBlobUrl,
                  previewStream,
                  error,
                }) => (
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
                          label={status}
                          color={status === "recording" ? "success" : "default"}
                        />
                      </Stack>
                      {status === "recording" && (
                        <Stack direction={"row"} alignItems="center">
                          <Typography variant="body1" marginRight={2}>
                            Time left:
                          </Typography>
                          <CountDownTimer hoursMinSecs={hoursMinSecs} />
                        </Stack>
                      )}
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      mb={3}
                    >
                      <Button
                        ref={startButtonRef}
                        variant="contained"
                        disabled={status === "recording"}
                        onClick={startRecording}
                      >
                        Start Recording
                      </Button>
                      <Button
                        ref={stopButtonRef}
                        variant="contained"
                        disabled={status !== "recording"}
                        onClick={() => {
                          stopRecording();
                          recordingTimer && clearTimeout(recordingTimer);
                        }}
                      >
                        Submit recording
                      </Button>
                    </Stack>

                    {mode == "recording" ? (
                      <LiveVideoView stream={previewStream} />
                    ) : (
                      <VideoReplayView mediaBlobUrl={mediaBlobUrl} />
                    )}
                    <ErrorDisplay error={error} />
                  </div>
                )}
              />
            )}

            {mode === "uploading" && (
              <Stack
                style={{ width: "100%", height: "100%" }}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={5}
              >
                <CircularProgress />
                <Typography variant="h6" marginRight={2}>
                  Uploading...
                </Typography>
              </Stack>
            )}
            {mode === "completed" && (
              <Stack
                style={{ width: "100%", height: "100%" }}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={5}
              >
                <Typography variant="h4">
                  Video uploaded successfully
                </Typography>

                <Typography variant="h6">
                  Make sure to complete all tasks
                </Typography>
              </Stack>
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6} key="2">
          {renderTask(task)}
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
