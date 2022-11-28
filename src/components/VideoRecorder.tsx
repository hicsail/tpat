import "../components/styles.css";
import { useState, useRef, useEffect } from "react";
import CountDownTimer from "./Timer";

import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useReactMediaRecorder } from "react-media-recorder";
import ResolvePermissionError from "./ResolvePermissionError";
import MicOffIcon from "@mui/icons-material/MicOff";
import { isDevMode } from "../config/config";

// enum for where webcam is being used.
export enum WEBCAM_CONTEXT {
  TUTORIAL,
  TASK,
}

export interface TaskHistory {
  [key: string]: { attempts: number; firstViewed: string };
}

export interface Props {
  downloadRecording: boolean;
  onRecordingComplete: (mediaBlobUrl: string, blob: Blob) => void;
  recordingTimeLimit: number;
}

const TAG = "Webcam.tsx ";
const failedUploadMessage =
  "Your recording failed to upload. Please record again.";

const videoStyle = { width: "100%", height: "100%", transform: "scale(-1, 1)" };

const LiveVideoView = ({
  stream,
  isAudioMuted,
}: {
  stream: MediaStream | null;
  isAudioMuted: boolean;
}) => {
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
    <Stack style={videoStyle}>
      <video ref={videoRef} autoPlay controls={false} />
      {/* <MicOffIcon color={isAudioMuted ? "error" : "success"} /> */}
    </Stack>
  );
};

const VideoReplayView = ({
  mediaBlobUrl,
}: {
  mediaBlobUrl: string | undefined;
}) => {
  return (
    <Stack style={videoStyle}>
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
        <Stack spacing={4}>
          <Typography color={"red"}>{"Error: " + errorMessage}</Typography>
          <ResolvePermissionError />
        </Stack>
      )}
    </>
  );
};

export default function VideoRecorder(props: Props) {
  const [mode, setMode] = useState<"recording" | "uploading" | "completed">(
    "recording"
  );
  const [uploadResultsMessage, setUploadResultsMessage] = useState("");
  const timeLimit = props.recordingTimeLimit;
  const hoursMinSecs = {
    minutes: Math.floor(timeLimit / 60),
    seconds: timeLimit % 60,
  };
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  var recordingTimer: NodeJS.Timeout;
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    previewAudioStream,
    error,
    isAudioMuted,
  } = useReactMediaRecorder({
    // video: { width: 1920, height: 1080, aspectRatio: 1.777777778 },
    video: true,
    stopStreamsOnStop: true,
    // mediaRecorderOptions: {
    //   audioBitsPerSecond: 128000,
    //   videoBitsPerSecond: 2500000,
    //   mimeType: "video/mp4",
    // },
    onStop: (mediaBlobUrl, blob) => {
      console.log("On stop called. mediaBlobUrl", mediaBlobUrl, "blob", blob);
      setMode("uploading");
      endRecordingSession(mediaBlobUrl, blob);
    },
  });

  useEffect(() => {
    if (status == "recording") {
      console.log("status", status);
      recordingTimer = setTimeout(() => {
        console.log(TAG, "time up baby");
        stopButtonRef.current?.click();
      }, timeLimit * 1000);

      //stop camera and clear timeout when component unmounts
      return () => {
        recordingTimer && clearTimeout(recordingTimer);
        stopButtonRef.current?.click();
      };
    }
    // MediaDevices.getSupportedConstraints();
    // const supported = navigator.mediaDevices.getSupportedConstraints();
    // console.log("supported", supported);
  }, [status]);

  useEffect(() => {
    //opens camera and shows camera view
    startButtonRef.current?.click();
  }, []);

  //TODO download as webm
  const downloadRecording = (mediaBlobUrl: string) => {
    const pathName = "teachertaskTutorial.webm";
    try {
      // for Chrome
      const link = document.createElement("a");
      link.href = mediaBlobUrl;
      link.download = pathName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
    setMode("completed");
  };

  const endRecordingSession = async (mediaBlobUrl: string, blob: Blob) => {
    props.onRecordingComplete(mediaBlobUrl, blob);
    if (blob) {
      console.log(TAG, "size of video recording:", blob.size);
      if (props.downloadRecording && !isDevMode) {
        downloadRecording(mediaBlobUrl);
      }
    } else {
      console.log("could not get recording. Blob:", blob);
      setUploadResultsMessage(failedUploadMessage);
    }
  };

  return (
    <Box>
      <Container>
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
              disabled={
                status === "recording" || status === "stopped" || !!error
              }
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
            <LiveVideoView stream={previewStream} isAudioMuted={isAudioMuted} />
          ) : (
            <VideoReplayView mediaBlobUrl={mediaBlobUrl} />
          )}
          <ErrorDisplay error={error} />
        </div>
      </Container>
    </Box>
  );
}
