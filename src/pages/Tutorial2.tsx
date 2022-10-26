import React from "react";

import Webcam, { WEBCAM_CONTEXT } from "../components/Webcam";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { data } from "../data";
import { Box, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import TaskView from "../components/TaskView";

function Tutorial2() {
  const task = data[0];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let location = useLocation();
  console.log("location", location);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box margin={5}>
        <Stack>
          <TaskView
            task={task}
            context={WEBCAM_CONTEXT.TUTORIAL}
            taskHistory={{ attempts: 1, firstViewed: "some date" }}
          />
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{ marginTop: 50 }}
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
          <DialogContent>
            <p style={{ marginBottom: 10, fontWeight: "bold" }}>
              Important Information about the Buttons
            </p>

            <p style={{ marginBottom: 10 }}>
              When you are in an actual task you will click a blue bar at the
              bottom of your screen to
              <span style={{ fontWeight: "bold" }}> “Start Recording” </span>
              when you want to progress to the recording page. You will{" "}
              <span style={{ color: "red" }}>automatically</span> progress there
              as soon as the timer runs out as well.{" "}
              <span style={{ textDecoration: "underline" }}>
                You cannot go back once you’ve selected “Start Recording”.
              </span>{" "}
              The camera records automatically and a countdown timer begins to
              show you your remaining time.
            </p>
            <p style={{ marginBottom: 10 }}>
              On the top of the next page you will see a
              <span style={{ fontWeight: "bold" }}> “Submit Recording” </span>
              button. This will stop recording your video and upload it
              automatically to the secure server. progress there as soon as the
              timer runs out as well.{" "}
              <span style={{ textDecoration: "underline" }}>
                Only click this button once you are done with your task.
              </span>{" "}
              The video will automatically submit once the{" "}
              <span style={{ color: "red" }}>timer runs out.</span>
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Tutorial2;
