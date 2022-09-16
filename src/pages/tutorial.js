import React from "react";
//import Modal from "../components/Modal";
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

function Tutorial() {
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

  const task = data[0];

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
            <Typography variant="h6">
              Your task is to do the following:
            </Typography>
            {task.task.map((t) => (
              <Typography variant="body1">{" >    " + t}</Typography>
            ))}
          </Stack>
          <Stack>
            <Typography variant="h6">Note:</Typography>
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
                  "The blue button on your screen will say one of the two options below: \
 \n \n \
“Start Recording” - This will progress you to the next page where you are expected to enact the task. The camera records automatically and a countdown timer begins to show you your remaining time. You cannot go back once you’ve selected “Start Recording” or your incomplete video will be automatically uploaded to our secure server. \
\n \n \
“Submit Recording” - The blue button on the task enactment page will stop recording your video and upload it automatically to the secure server. Only click this button once you are done with your task. \
\n \n \
Note:  If you do not click the blue Submit Recording button, your video will be uploaded once the recording stops at the end of the countdown timer. \
                "
                }
              </Typography>
            </Popup>
          </Stack>
          <Button variant="contained" onClick={handleClickOpen}>
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
          <div className="tutorial">
            <Typography style={{ whiteSpace: "pre-line" }}>
              {
                "This is the directions page. Notice the on this page. You have a limited amount of time to view the directions before you are asked to enact the task. \
                 \n \n \
                 When the timer runs out or when you click the blue bar titled “Start Recording,” you are sent to a page to enact your task and a recording of your camera will begin. The directions will be viewable on the recording page as well, on the right side of the screen.  \
                 \nReminder: During task the blue bar will advance you to the recording screen, only click it when you are ready to record. You cannot go back.\
                 \n \n \
                 On the next screen you will have to give permission to use your camera microphone. \
                 \n \n \
                 When you have finished your task (and have clicked “Submit Recording”) or when the timer runs out, the video will automatically upload to a secure server (when completing an actual task.)  \
                 \n \n \
                 For the purpose of the tutorial, your video will download to your computer instead of uploading to the secure server. This is for you to check the quality of your video prior to beginning an actual task. Reach out to teachsimlab@gmail.com if you have any issues you cannot resolve with your tutorial task video.\
                 "
              }
            </Typography>
          </div>
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

export default Tutorial;
