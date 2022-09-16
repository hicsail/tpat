import "../components/styles.css";
import { useState, useEffect, useContext, useRef } from "react";
import { data } from "../data";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import {
  useRecordWebcam,
  CAMERA_STATUS,
  RecordWebcamOptions,
  RecordWebcamHook,
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

export default function WebcamExperimental1(props: Props) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const recordWebcam = useRef(useRecordWebcam(OPTIONS));

  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };
  const [uploading, setUploading] = useState(false);
  const [recording, setRecording] = useState(false);
  //   const [webcamStatus, setWebcamStatus] = useState<
  //     "CLOSED" | "INIT" | "OPEN" | "RECORDING|PREVIEW"
  //   >();
  const task = props.task;
  const [isRecordingTimerSet, setIsRecordingTimerSet] = useState(false);
  const [postRecordingProcessStarted, setPostRecordingProcessStarted] =
    useState(false);

  //   console.log(TAG, "rendering ... recordWebcam.current.status =", recordWebcam.current.status);

  //   const handleRecordWebcamScurrent.topped = () => {
  //     // recordWebcam.current.close();
  //     console.log(
  //       "in handleRecordWebcamScurrent.topped. recordWebcam.current.status ",
  //       recordWebcam.current.status
  //     );

  //     recordWebcam.current.stop();
  //     if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
  //       recordWebcam.current.download();
  //       navigate("/");
  //     } else {
  //       uploadTask(recordWebcam)current.;
  //     }
  //   };

  const openCam = async () => {
    console.log(
      "recordWebcam.current",
      recordWebcam.current,
      "recordWebcam.current==undefined",
      recordWebcam.current == undefined
    );
    await recordWebcam.current.open();
  };

  const startCam = async () => {
    await recordWebcam.current.start();
    // setRecording(true);
  };

  const stopCam = async () => {
    return await recordWebcam.current.stop();
  };

  useEffect(() => {
    console.log("opening cam");
    openCam();
  }, []);

  //   useEffect(() => {
  //     const recordingLimitTimer = setTimeout(() => {
  //       console.log("executing recordingLimitTimer");
  //       recordWebcam.current.stop();
  //     }, RECORDING_TIME_LIMIT * 1000);
  //     return () => clearTimeout(recordingLimitTimer);
  //   }, []);

  useEffect(() => {
    console.log(
      "rerunning cam ue recordWebcam.current.status ",
      recordWebcam.current.status
    );
    // opening the camera
    //   setTimeout(() => {
    //     if (recordWebcam.current.status === CAMERA_STATUS.CLOSED) {
    //       recordWebcam.current.open();
    //     }
    //   }, 1000);

    // When camera is open, it will immediately start recording
    if (recordWebcam.current.status === CAMERA_STATUS.OPEN) {
      //   await recordWebcam.current.start();
      //   setRecording(true);
      startCam();
    }

    if (
      recordWebcam.current.status === CAMERA_STATUS.PREVIEW &&
      !postRecordingProcessStarted
    ) {
      setPostRecordingProcessStarted(true);
      console.log(
        "running recordWebcam.current.status === CAMERA_STATUS.PREVIEW logic"
      );
      recordWebcam.current.close();
      if (props.context == WEBCAM_CONTEXT.TUTORIAL) {
        recordWebcam.current.download();
        navigate("/");
      } else {
        uploadTask(recordWebcam);
      }
    }
  });

  async function uploadTask(
    recordWebcam: React.MutableRefObject<RecordWebcamHook>
  ) {
    setUploading(true);
    const blob = await recordWebcam.current.getRecording();
    const metadata = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      taskId: task.id.toString(),
      university: user.university,
    };
    // signature of getRecording is wrongfully defined as getRecording(): void in RecordWebcamHcurrent.ook
    //so blob has to be cast as any
    await uploadTos3(blob as any, metadata);
    setUploading(false);
    navigate("/");
  }

  const onSubmit = async () => {
    console.log(
      "submit clicked. recordWebcam.current.status:",
      recordWebcam.current.status
    );
    // recordWebcam.current.stop();
    await stopCam();
    // setTimeout(() => {
    //   recordWebcam.current.stop();
    // }, 0);
    // while (recordWebcam.current.status !== CAMERA_STATUS.PREVIEW) {
    //   recordWebcam.current.stop();
    // }
    console.log(
      " recordWebcam.current.stop(); executed",
      recordWebcam.current.status
    );
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
              <video
                ref={recordWebcam.current.webcamRef}
                style={{
                  width: "100%",
                }}
                autoPlay
                muted
              />
              //   <RecordWebcam
              //     render={(props: WebcamRenderProps) => {
              //       //   webcamRenderProps = props;
              //       return (
              //         <div>
              //           <h1>Component render prop demo</h1>
              //           <p>Camera status: {props.status}</p>
              //           <div>
              //             <button onClick={props.openCamera}>Open camera</button>
              //             <button onClick={props.retake}>Retake</button>
              //             <button onClick={props.start}>Start recording</button>
              //             <button onClick={props.stop}>Stop recording</button>
              //             <button onClick={props.download}>Download</button>
              //           </div>
              //         </div>
              //       );
              //     }}
              //   />
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
                  label={recordWebcam.current.status}
                  color={
                    recordWebcam.current.status === CAMERA_STATUS.RECORDING
                      ? "success"
                      : "default"
                  }
                />
              </Stack>

              {recordWebcam.current.status === CAMERA_STATUS.OPEN ||
              recordWebcam.current.status === CAMERA_STATUS.RECORDING ? (
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
          disabled={recordWebcam.current.status !== CAMERA_STATUS.RECORDING}
          //    disabled={(webcamRenderProps != undefined) ?  webcamRenderProps.status !== CAMERA_STATUS.RECORDING : false}
          onClick={onSubmit}
          name="upload"
        >
          Submit recording
        </Button>
      </Stack>
    </Box>
  );
}
