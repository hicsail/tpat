import "../components/styles.css";
import { useState, useContext, useRef, useEffect } from "react";
import { data } from "../data";
import { useNavigate } from "react-router-dom";

import { uploadTos3 } from "../utils/videoUploadUtils";
import { UserContext } from "../store/UserContext";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { PREP_TIME_LIMIT, RECORDING_TIME_LIMIT } from "../config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import PositionedSnackbar from "./PositionedSnackbar";
import VideoRecorder from "./VideoRecorder";

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

const TAG = "TaskView.tsx ";
const successfulUploadMessage = "Your recording was uploaded successfully";
const failedUploadMessage =
  "Your recording failed to upload. Please record again.";

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

export default function TaskView(props: Props) {
  const [mode, setMode] = useState<"recording" | "uploading" | "completed">(
    "recording"
  );
  const [uploadResultsMessage, setUploadResultsMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const task = props.task;
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
      userAgent: window.navigator.userAgent,
    };
    const uploadResults = await uploadTos3(videoBlob, metadata);
    setUploadResultsMessage(
      uploadResults ? successfulUploadMessage : failedUploadMessage
    );
  };

  const onRecordingComplete = async (mediaBlobUrl: string, blob: Blob) => {
    if (blob) {
      if (props.context != WEBCAM_CONTEXT.TUTORIAL) {
        await uploadTask(blob);
      } else {
        setUploadResultsMessage("Video was downloaded.");
      }
      setMode("completed");
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
            <VideoRecorder
              downloadRecording={props.context == WEBCAM_CONTEXT.TUTORIAL}
              onRecordingComplete={onRecordingComplete}
              recordingTimeLimit={PREP_TIME_LIMIT}
            />
          </Container>
        </Grid>
        <Grid item xs={12} md={6} key="2">
          <>
            {mode === "recording" && <>{renderTask(task)}</>}
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
                  Video uploaded successfully.
                </Typography>

                <Typography variant="h6">
                  Click the back button to return to the list of tasks. Note:
                  You must track your own completion, as the task list does not
                  show whether or not you have completed each task.
                </Typography>
              </Stack>
            )}
          </>
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
