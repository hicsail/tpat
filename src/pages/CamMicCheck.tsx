import { data } from "../data";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { SCREENS } from "../constants/screens";
import Webcam, { TaskHistory } from "../components/Webcam";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { PREP_TIME_LIMIT } from "../config/config";
import { STORAGE_KEYS } from "../constants/storageKeys";
import VideoRecorder from "../components/VideoRecorder";
import {
  SpectrumVisualizer,
  SpectrumVisualizerTheme,
  WaveformVisualizer,
  WaveformVisualizerTheme,
} from "react-audio-visualizers";
const TAG = "CamMicCheck.tsx ";
function Task() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [mode, setMode] = useState<"preparing" | "recording">("preparing");
  const [taskHistory, setTaskHistory] = useState<TaskHistory>({});
  const [passedAllCamMicChecks, setPassedAllCamMicChecks] = useState(false);
  const [checked, setChecked] = useState(false);
  /**
   * TODO
   * check task history
   *  if mic check done,
   *    show task
   *  else
   *    show mic check only
   *
   *   centered webcam
   *   with audio analyzer
   *
   *   Status: performing cam and mic check
   *           No issues detected: Your cam and mic are setup properly
   *           Check downloaded video to make sure
   *           CHECKBOX: I watched my video: There are no issues with my video and audio
   *   Checks
   *  check more than zero mb
   *
   */

  const onRecordingComplete = (mediaBlobUrl: string, blob: Blob) => {
    console.log(TAG, "size of video recording:", blob.size);
    //check that video blob is recoverable

    if (blob.size < 5) {
    }

    //check audio
  };

  return (
    <Box margin={5}>
      <VideoRecorder
        downloadRecording
        onRecordingComplete={onRecordingComplete}
        recordingTimeLimit={100}
      />

      {passedAllCamMicChecks && (
        <Typography>
          No issues detected: Your cam and mic are setup properly
        </Typography>
      )}

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(_, checked) => {
                setChecked(checked);
              }}
            />
          }
          label="I watched my downloaded video: There are no issues with my video and audio"
        />
      </FormGroup>

      <Button variant="contained" onClick={() => {}}>
        Finish
      </Button>
    </Box>
  );
}

export default Task;
