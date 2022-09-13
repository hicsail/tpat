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
              {hoursMinSecs.minutes}:{hoursMinSecs.seconds}0
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
                Timer on the right top corner will start the count down when you
                first navigate onto the screen. After the timer runs out, it
                will automatically take you to the next screen
              </Typography>
            </Popup>
          </Stack>
        </Stack>
        <Stack spacing={10} mt={5}>
          <Stack>
            <Typography variant="button">Category</Typography>
            <Stack direction="row" alignItems="center" alignSelf={"flex-start"}>
              <Typography variant="h3">Task Title</Typography>

              <Popup
                trigger={
                  <IconButton size="small">
                    <InfoIcon fontSize="inherit" color="primary" />
                  </IconButton>
                }
                position="right center"
              >
                <div>
                  In this text box, you will see the task title of the task that
                  you
                </div>
              </Popup>
            </Stack>
            <Stack direction="row" alignItems="center" alignSelf={"flex-start"}>
              <Typography variant="body1">Task description</Typography>

              <Popup
                trigger={
                  <IconButton size="small">
                    <InfoIcon fontSize="inherit" color="primary" />
                  </IconButton>
                }
                position="right center"
              >
                <Typography variant="body1">
                  In this text box, you will see the description of the task
                  that you are going to perform on the next page. Remember to
                  read carefully as it will not appear again in the next page
                </Typography>
              </Popup>
            </Stack>
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
            Next
          </Link>
        </div>
        <Stack mt={5}>
          <Button variant="contained" onClick={handleClickOpen}>
            Click to see Instructions
          </Button>
        </Stack>
      </Stack>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Instructions"}</DialogTitle>
        <DialogContent>
          <div className="tutorial">
            <h2>Timer</h2>
            <p>
              Timer on the right top corner will start the count down when you
              first navigate onto the screen. After the timer runs out, it will
              automatically take you to the next screen
            </p>
            <br />
            <h2>Category</h2>
            <p>
              This text box will show the subject or the category of the task
              that you are going to be looking at
            </p>
            <br />
            <h2>Task TItle</h2>
            <p>
              In this text box, you will see the task title of the task that you
              are about to do
            </p>
            <br />
            <h2>Description</h2>
            <p>
              In this text box, you will see the description of the task that
              you are going to perform on the next page. Remember to read
              carefully as it will not appear again in the next page
            </p>
            <br />
            <h2>Next Button</h2>
            <p>
              When you finish reading the prompts, and are ready to move on,
              click on the next button at the bottom left corner. On the actual
              assignment page, it is worded "start recording" but don't worry,
              it won't automatically start recording when you click on it to the
              next page
            </p>
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
