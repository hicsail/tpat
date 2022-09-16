import React from "react";

import Webcam, { WEBCAM_CONTEXT } from "../components/Webcam";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { data } from "../data";
import { Box, Stack, Typography } from "@mui/material";

function Tutorial2() {
  const task = data[0];
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box margin={5}>
      <Stack>
        <Webcam task={task} context={WEBCAM_CONTEXT.TUTORIAL} />
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ marginTop: 10 }}
        >
          Click to see Instructions
        </Button>
      </Stack>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Timer on the task"}</DialogTitle>
        <DialogContent>
          <Typography style={{ whiteSpace: "pre-line" }}>
            {
              "On this screen you will have to give permission to use your camera microphone. \
  \n \n \
The timer starts to count down as soon as you are on the page and you must enact the task before the timer runs out. \
\n \n \
When you have finished your task (and have clicked “Submit Recording”) or when the timer runs out, the video will automatically upload to a secure server (when completing an actual task.) \
\nNote: If you click the back button or exit the task, the video automatically uploads to the server as your attempt. \
\n \n \
For the purpose of the tutorial, your video will download to your computer instead of uploading to the secure server. This is for you to check the quality of your video prior to beginning an actual task. Reach out to teachsimlab@gmail.com if you have any issues you cannot resolve with your tutorial task video. "
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Tutorial2;
