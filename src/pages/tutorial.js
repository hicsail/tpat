import React, { useState } from "react";
import Modal from "react-modal";
//import Modal from "../components/Modal";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import { SCREENS } from "../constants/screens";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import { RECORDING_TIME_LIMIT } from "../config/config";

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
    <div
      style={{
        border: "1px solid black",
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%",
      }}
    >
      <div style={{ marginLeft: "5%", marginTop: "2%", paddingBottom: "2%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "2%",
          }}
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingBottom: "1%",
            }}
          >
            <Popup
              trigger={
                <button
                  style={{
                    border: "0",
                    fontSize: "16px",
                    paddingLeft: "2%",
                    cursor: "pointer",
                  }}
                >
                  {hoursMinSecs.minutes}:{hoursMinSecs.seconds}
                </button>
              }
              position="left center"
            >
              <div>
                Timer on the right top corner will start the count down when you
                first navigate onto the screen. After the timer runs out, it
                will automatically take you to the next screen
              </div>
            </Popup>
            <img
              style={{ paddingLeft: "0.5%" }}
              src={require("../images/Clock.png")}
              className="img"
              alt="clock icon"
            />
          </div>
        </div>
        <div style={{ marginTop: "3%", paddingLeft: "2%" }}>
          <Button variant="outlined" onClick={handleClickOpen}>
            Click to see Instructions
          </Button>
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
                  Timer on the right top corner will start the count down when
                  you first navigate onto the screen. After the timer runs out,
                  it will automatically take you to the next screen
                </p>
                <br />
                <h2>Category</h2>
                <p>
                  This text box will show the subject or the category of the
                  task that you are going to be looking at
                </p>
                <br />
                <h2>Task TItle</h2>
                <p>
                  In this text box, you will see the task title of the task that
                  you are about to do
                </p>
                <br />
                <h2>Description</h2>
                <p>
                  In this text box, you will see the description of the task
                  that you are going to perform on the next page. Remember to
                  read carefully as it will not appear again in the next page
                </p>
                <br />
                <h2>Next Button</h2>
                <p>
                  When you finish reading the prompts, and are ready to move on,
                  click on the next button at the bottom left corner. On the
                  actual assignment page, it is worded "start recording" but
                  don't worry, it won't automatically start recording when you
                  click on it to the next page
                </p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <p
          style={{
            paddingBottom: "1%",

            paddingLeft: "2%",
            color: "#B3B3B3",
          }}
        >
          Category
        </p>

        <Popup
          trigger={
            <button
              style={{
                border: "0",
                fontSize: "24px",
                fontWeight: "600",
                paddingLeft: "2%",
                cursor: "pointer",
              }}
            >
              Task Title
            </button>
          }
          position="right center"
        >
          <div>
            In this text box, you will see the task title of the task that you
            are about to do
          </div>
        </Popup>
        <br></br>

        <Popup
          trigger={
            <button
              style={{
                border: "0",
                fontSize: "19px",
                paddingLeft: "2%",
                cursor: "pointer",
              }}
            >
              Description
            </button>
          }
          position="right center"
        >
          <div>
            In this text box, you will see the description of the task that you
            are going to perform on the next page. Remember to read carefully as
            it will not appear again in the next page
          </div>
        </Popup>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "3%",
          marginBottom: "3%",
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
    </div>
  );
}

export default Tutorial;
