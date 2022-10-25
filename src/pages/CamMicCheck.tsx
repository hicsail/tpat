import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import VideoRecorder from "../components/VideoRecorder";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { SCREENS } from "../constants/screens";
import { CAM_MIC_CHECK_TIME_LIMIT } from "../config/config";

const TAG = "CamMicCheck.tsx ";

function CamMicCheck() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [passedAllCamMicChecks, setPassedAllCamMicChecks] = useState(false);
  const [checked, setChecked] = useState(false);
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
    //record completion in memory
    const credentials = { ...user, camMicCheckComplete: true };

    setUser(credentials);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
    navigate(SCREENS.HOME);
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <VideoRecorder
          downloadRecording
          onRecordingComplete={onRecordingComplete}
          recordingTimeLimit={CAM_MIC_CHECK_TIME_LIMIT}
        />
      </Box>

      {passedAllCamMicChecks && (
        <Typography>
          No issues detected: Your cam and mic are setup properly
        </Typography>
      )}

      {recordingComplete && (
        <Stack alignContent={"center"} spacing={5} marginY={5}>
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
          <Button variant="contained" onClick={onFinish}>
            Finish
          </Button>
        </Stack>
      )}
    </Container>
  );
}

export default CamMicCheck;
