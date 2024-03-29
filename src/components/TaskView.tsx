import "../components/styles.css";
import { useState, useContext, useRef, useEffect } from "react";
import { data } from "../data";
import { useNavigate } from "react-router-dom";

import { uploadInParts } from "../utils/videoUploadUtils";
import { UserContext } from "../store/UserContext";
import {
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  GOOGLE_FORM_URL,
  PREP_TIME_LIMIT,
  RECORDING_TIME_LIMIT,
} from "../config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import PositionedSnackbar from "./PositionedSnackbar";
import VideoRecorder from "./VideoRecorder";
import { useLocalStorage } from "usehooks-ts";

// enum for where webcam is being used.
export enum WEBCAM_CONTEXT {
  TUTORIAL,
  TASK,
}

export interface TaskHistory {
  [key: string]: { attempts: number; firstViewed: string };
}

export interface Props {
  task: (typeof data)[0]; //TODO define task interface
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
          <br></br>
          {task.passageTitle && (
            <Typography variant="h6">Read-aloud text:</Typography>
          )}

          {task.passageTitle && (
            <Box
              sx={{
                border: "1px solid #000", // adds a black border
                backgroundColor: "#e0e0e0", // sets a grey background
                padding: "16px", // adds some spacing inside the border
                borderRadius: "4px", // optional, to round the corners
                textAlign: "center", // centers everything inside the Box, including the title
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                {task.passageTitle}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {task.passage}
              </Typography>
            </Box>
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
          {task.prompts.map((t: string, index: number) => (
            <Typography key={index.toString()} variant="body1">
              {" >    " + t}
            </Typography>
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
  const [isCompleted, setIsCompleted] = useLocalStorage(props.task.id, false);

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

    const metadata = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      taskId: task.id.toString(),
      attempts: props.taskHistory.attempts.toString(),
      firstViewed: props.taskHistory.firstViewed,
      netPrepTimeInHours: netPrepTimeInHours.toString(),
      userAgent: window.navigator.userAgent,
    };

    await uploadInParts(
      videoBlob,
      metadata,
      (progressPercentage) => {
        setUploadResultsMessage(progressPercentage.toFixed(0) + "% uploaded");
      },
      () => {
        setUploadResultsMessage(failedUploadMessage);
      },
      () => {
        setUploadResultsMessage(successfulUploadMessage);
      }
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
      // mark task as completed in local storage
      setIsCompleted(true);
    } else {
      console.log("could not get recording. Blob:", blob);
      setUploadResultsMessage(failedUploadMessage);
    }
  };

  const onDismissSnackbar = () => {
    navigate("/");
  };

  return (
    <Box>
      <Grid container spacing={3} flex={1}>
        <Grid item container xs={12} md={6} key="1">
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
                <Typography variant="h5" marginRight={2}>
                  Uploading...
                </Typography>
                <Typography variant="h6" marginRight={2}>
                  This can take several minutes, however, if you see this screen
                  for an extended period of time, please click{" "}
                  <Link href={GOOGLE_FORM_URL} target="_blank" rel="noopener">
                    this form
                  </Link>{" "}
                  to report this issue to our team.
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
                <Typography variant="h4">{uploadResultsMessage}</Typography>

                <Typography variant="h6">
                  Part 3: Provide a Rationale for Your Teaching
                </Typography>
                <Typography variant="h6">
                  <Link target="_blank" href={task.rationaleLink}>
                    {task.rationale}
                  </Link>
                </Typography>

                <Typography variant="h6">
                  Note: You must track your own completion, as the task list
                  does not show whether or not you have completed each task.
                  Please refer back to your emailed instructions to know which
                  task to move onto or what to do next. Remember, you have been
                  assigned four out of the 6 tasks to complete.
                </Typography>
                <Button
                  variant="text"
                  onClick={() => {
                    console.log(task.id);
                    if (parseInt(task.id) >= 7) {
                      navigate("/literacy");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  <Typography variant="h6">
                    Go back to the list of performance tasks
                  </Typography>
                </Button>
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
