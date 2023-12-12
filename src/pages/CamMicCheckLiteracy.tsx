import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import VideoRecorder from "../components/VideoRecorder";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { SCREENS } from "../constants/screens";
import { CAM_MIC_CHECK_TIME_LIMIT } from "../config/config";
import ResolvePermissionError from "../components/ResolvePermissionError";

const TAG = "CamMicCheckLiteracy.tsx ";

function CamMicCheckLiteracy() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [micCheckResults, setmicCheckResults] = useState<"noIssues" | "issues">(
    "noIssues"
  );
  const [recordingComplete, setRecordingComplete] = useState(false);

  /**
   * Perform a series of checks to ensure cam and mic are working properly
   * @param mediaBlobUrl
   * @param blob
   */
  const onRecordingComplete = (mediaBlobUrl: string, blob: Blob) => {
    setRecordingComplete(true);
    console.log(TAG, "size of video recording:", blob.size);
    //check that video blob is recoverable
    if (blob.size < 5) {
      //5 is an arbitrary size. a 5 sec video of
    }
    //check audio
  };

  const onFinish = () => {
    if (micCheckResults) {
      //record completion in memory
      const credentials = { ...user, camMicCheckComplete: true };

      setUser(credentials);
      localStorage.setItem(
        STORAGE_KEYS.CREDENTIALS,
        JSON.stringify(credentials)
      );
      navigate("/literacy");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box marginTop={10}>
        <VideoRecorder
          downloadRecording
          onRecordingComplete={onRecordingComplete}
          recordingTimeLimit={CAM_MIC_CHECK_TIME_LIMIT}
        />
      </Box>
      <Typography variant="caption" marginTop={5}>
        Please do not use wireless headphones in the recording of these tasks,
        as they cause audio delays. If you experience audio delays for other
        reasons, but are still able to complete the tasks, we will accept those
        videos.
      </Typography>
      {recordingComplete && (
        <Stack alignContent={"center"} spacing={5} marginY={5}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={micCheckResults}
              onChange={(_, checked) => {
                setmicCheckResults(checked as "noIssues" | "issues");
              }}
            >
              <FormControlLabel
                value={"noIssues"}
                control={<Radio />}
                label="By checking this box I confirm that I watched my downloaded video and there are no issues: my video captured my image and the audio. "
              />
              <FormControlLabel
                value={"issues"}
                control={<Radio />}
                label="There were issues with my video and/or audio that I could not solve."
              />
            </RadioGroup>
          </FormControl>

          {micCheckResults == "issues" ? (
            <ResolvePermissionError />
          ) : (
            <Button variant="contained" onClick={onFinish}>
              Finish
            </Button>
          )}
        </Stack>
      )}
    </Container>
  );
}

export default CamMicCheckLiteracy;
