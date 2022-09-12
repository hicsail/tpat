import React from "react";

import Webcam, { WEBCAM_CONTEXT } from "../components/Webcam";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Tutorial2() {
  const taskIndex = 0;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginLeft: "5%", paddingTop: "3%", marginRight: "5%" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Click to see Instructions
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Timer on the task"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your camera will automatically start and open when you get onto the
            page / auto-directed to the page. Once you are on the page, your
            camera will automatically open, and start recording shortly after.
            You will also be able to see the timer starting to count down. The
            video will stop after the task timer/timer runs out, but you are
            also able to stop recording once you are finished. The video will
            automatically download to your local computer, and redirect you back
            to the homepage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Webcam id={taskIndex} context={WEBCAM_CONTEXT.TUTORIAL} />
    </div>
  );
}

export default Tutorial2;
