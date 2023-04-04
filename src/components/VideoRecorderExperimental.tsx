import "../components/styles.css";
import { useState, useContext, useRef, useEffect } from "react";
import { data } from "../data";
import CountDownTimer from "./Timer";
import { useNavigate } from "react-router-dom";
import {
  AudioVisualizer,
  AudioVisualizerCommonProps,
  AudioVisualizerEvents,
} from "react-audio-visualizers-core";

import { UserContext } from "../store/UserContext";
import {
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import PositionedSnackbar from "./PositionedSnackbar";
import { ReactMediaRecorder } from "react-media-recorder";
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
} from "react-audio-visualizers";
// TODO show audio visualizer
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

const TAG = "VideoRecorderExperimental.tsx ";
const successfulUploadMessage = "Your recording was uploaded successfully";
const failedUploadMessage =
  "Your recording failed to upload. Please record again.";

const LiveVideoView = ({
  stream,
  audioStream,
}: {
  stream: MediaStream | null;
  audioStream: any;
}) => {
  var defaultAudioSource = require("../audio.mp3");

  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("audioStream", audioStream);
  if (audioStream) {
    const audioTrack = audioStream.getAudioTracks();
    console.log(" audioTrack track", audioTrack);
    if (audioTrack.readyState == "live") {
      console.log("Recording audio");
    }
  }

  const [audioSource, setAudioSource] = useState<Uint8Array>();
  const [showAudioVisualizer, setShowAudioVisualizer] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (showAudioVisualizer) {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(audioStream);
      source.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      console.log("dataarray", dataArray);

      setAudioSource(dataArray);
      setShowAudioVisualizer(true);
    }
  }, [showAudioVisualizer, audioStream]);

  if (!stream) {
    return null;
  }

  return (
    <>
      <Stack style={{ width: "100%", height: "100%" }}>
        <video ref={videoRef} autoPlay controls={false} />
      </Stack>
      {/* <Button
        onClick={() => {
          setShowAudioVisualizer(!showAudioVisualizer);
        }}
      >
        Show EQ
      </Button>
      {showAudioVisualizer && (
        <SpectrumVisualizer
          audio={audioSource}
          theme={SpectrumVisualizerTheme.squaredBars}
          colors={["#009688", "#26a69a"]}
          iconsColor="#26a69a"
          // backgroundColor="red"
          showMainActionIcon
          showLoaderIcon
          highFrequency={8000}
          onEvent={onEvent}
        />
      )} */}
    </>
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

export default function VideoRecorder(props: Props) {
  const [mode, setMode] = useState<"recording" | "uploading" | "completed">(
    "recording"
  );
  const [uploadResultsMessage, setUploadResultsMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const timeLimit = props.recordingTimeLimit;
  const hoursMinSecs = {
    minutes: Math.floor(timeLimit / 60),
    seconds: timeLimit % 60,
  };
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  var recordingTimer: NodeJS.Timeout;

  useEffect(() => {
    //opens camera and shows camera view
    startButtonRef.current?.click();

    recordingTimer = setTimeout(() => {
      stopButtonRef.current?.click();
    }, timeLimit * 1000);

    //stop camera and clear timeout when component unmounts
    return () => {
      recordingTimer && clearTimeout(recordingTimer);
      stopButtonRef.current?.click();
    };
  }, []);

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
    props.onRecordingComplete(mediaBlobUrl, blob);
    if (blob) {
      console.log(TAG, "size of video recording:", blob.size);
      //download video when in tutorial
      if (props.downloadRecording) {
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
        <ReactMediaRecorder
          video
          mediaRecorderOptions={{
            mimeType: "video/x-matroska;codecs=avc1",
          }}
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
            previewAudioStream,
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
                  disabled={status === "recording" || status === "stopped"}
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
                <LiveVideoView
                  stream={previewStream}
                  audioStream={previewAudioStream}
                />
              ) : (
                <VideoReplayView mediaBlobUrl={mediaBlobUrl} />
              )}
              <ErrorDisplay error={error} />
            </div>
          )}
        />
      </Container>
    </Box>
  );
}

/**
 *
 * Mic & check
 * open webcam
 * check upload size
 * check audio value
 * show success video
 *
 *
 */
