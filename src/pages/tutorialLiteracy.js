import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import { SCREENS } from "../constants/screens";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack, Typography } from "@mui/material";
import { RECORDING_TIME_LIMIT } from "../config/config";
import InfoIcon from "@mui/icons-material/Info";
import { data } from "../data";

function TutorialLiteracy() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const hoursMinSecs = {
    minutes: Math.floor(RECORDING_TIME_LIMIT / 60),
    seconds: RECORDING_TIME_LIMIT % 60,
  };

  const task = data[7];

  return (
    <>
      <Stack padding={5} margin={5} border="1px solid #808080" borderRadius={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <div style={{ display: "flex", justifyContent: "inline" }}>
            <img
              style={{ paddingLeft: "0.5%" }}
              src={require("../images/Arrow.png")}
              className="img"
              alt="arrow icon"
            />
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: "10%",
              }}
              to={"/" + SCREENS.HOME}
            >
              Back
            </Link>
          </div>

          <Stack direction="row" alignItems="center">
            <div>
              {hoursMinSecs.minutes}:{hoursMinSecs.seconds}
            </div>
            <img
              style={{ paddingLeft: "0.5%" }}
              src={require("../images/Clock.png")}
              className="img"
              alt="clock icon"
            />
            <Popup
              trigger={
                <IconButton size="small">
                  <InfoIcon fontSize="inherit" color="primary" />
                </IconButton>
              }
              position="left center"
            >
              <Typography variant="body1">
                The timer counts down until the page changes. In the tutorial,
                this timer does not count down.
              </Typography>
            </Popup>
          </Stack>
        </Stack>
        <Stack spacing={10} mt={5}>
          <Stack>
            <Typography variant="button">Category</Typography>
            <Stack direction="row" alignItems="center" alignSelf={"flex-start"}>
              <Typography variant="h3">{task.title}</Typography>

              <Popup
                trigger={
                  <IconButton size="small">
                    <InfoIcon fontSize="inherit" color="primary" />
                  </IconButton>
                }
                position="right center"
              >
                <div>The title is the name of the task.</div>
              </Popup>
            </Stack>

            <Stack direction="row" alignItems="center" alignSelf={"flex-start"}>
              <Typography variant="body1">{task.description}</Typography>

              <Popup
                trigger={
                  <IconButton size="small">
                    <InfoIcon fontSize="inherit" color="primary" />
                  </IconButton>
                }
                position="right center"
              >
                <Typography variant="body1">
                  The description of your task will include context to provide
                  brief background knowledge, the specific task and directions
                  to complete the task.
                </Typography>
              </Popup>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="h6" fontWeight={800}>
              Your task is to do the following:
            </Typography>
            {task.task.map((t, index) => (
              <Typography key={index.toString()} variant="body1">
                {" >    " + t}
              </Typography>
            ))}
          </Stack>
          <Stack>
            <Typography variant="h6" fontWeight={800}>
              Note:
            </Typography>
            <Typography variant="body1">
              -You are speaking to your class the entire time.
            </Typography>
            <Typography variant="body1">
              -You may use visual (whiteboard, paper, etc.) and hold it up in
              bold, clear view to your camera.
            </Typography>
          </Stack>
        </Stack>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {task.id === "7" ? (
            <Link
              style={{
                border: "2px solid #e26c40",
                padding: "1%",
                color: "#e26c40",
                borderRadius: "10px",
                textDecoration: "none",
              }}
              to="/tutorial2Literacy"
            >
              Continue Tutorial
            </Link>
          ) : (
            <Link
              style={{
                border: "2px solid #e26c40",
                padding: "1%",
                color: "#e26c40",
                borderRadius: "10px",
                textDecoration: "none",
              }}
              to="/tutorial2"
            >
              Continue Tutorial
            </Link>
          )}
        </div>
        <Stack mt={5}>
          <Stack alignSelf={"flex-start"}>
            <Popup
              trigger={
                <IconButton size="small">
                  <InfoIcon fontSize="inherit" color="primary" />
                </IconButton>
              }
              position="right center"
            >
              <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                {
                  "Important Information about the Buttons \
 \n \n \
 When you are in an actual task you will click a blue bar at the bottom of your screen to “Start Recording” when you want to progress to the recording page. You will automatically progress there as soon as the timer runs out as well. You cannot go back once you’ve selected “Start Recording. The camera records automatically and a countdown timer begins to show you your remaining time. \
\n \n \
“On the top of the next page you will see a “Submit Recording” button. This will stop recording your video and upload it automatically to the secure server. Only click this button once you are done with your task. The video will automatically submit once the timer runs out. \
"
                }
              </Typography>
            </Popup>
          </Stack>
          <Button variant="outlined" onClick={handleClickOpen}>
            Click to see instructions
          </Button>
        </Stack>
      </Stack>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tutorial"}</DialogTitle>
        <DialogContent>
          <p style={{ marginBottom: 10 }}>
            1. This is the directions page. Notice
            <span style={{ fontWeight: "bold" }}> the timer</span> on this page.
            You have a limited amount of time to view the directions before you
            are asked to enact the task.
          </p>
          <p style={{ marginBottom: 10 }}>
            2. When the timer runs out or when When you have finished your task
            (and have clicked “Submit Recording”) or when the timer runs out,
            the video will on this page.
            <span style={{ fontWeight: "bold" }}>
              Reminder: During task the blue bar will advance you to the
              recording screen, only click it when you are ready to record. You
              cannot go back.
            </span>
          </p>
          <p style={{ marginBottom: 10 }}>
            3. On the next screen you will have to give
            <span style={{ fontWeight: "bold" }}>
              {" "}
              permission to use your camera microphone.
            </span>
          </p>
          <p style={{ marginBottom: 10 }}>
            4. When you have finished your task (and have clicked “Submit
            Recording”) or when the timer runs out, the video will
            <span style={{ fontWeight: "bold" }}> automatically upload </span>to
            a secure server (when completing an actual task.)
          </p>
          <p style={{ fontStyle: "italic" }}>
            5. For the purpose of the tutorial, your video will download to your
            computer instead of uploading to the secure server. This is for you
            to check the quality of your video prior to beginning an actual
            task. Reach out to teachsimlab@gmail.com if you have any issues you
            cannot resolve with your tutorial task video.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TutorialLiteracy;
