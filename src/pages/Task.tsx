import { data } from "../data";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { SCREENS } from "../constants/screens";
import Webcam from "../components/Webcam";
import { Button, Stack, Typography } from "@mui/material";
import { PREP_TIME_LIMIT } from "../config/config";

function Task() {
  const { user } = useContext(UserContext);

  // Get ID from URL
  const { id } = useParams();
  const taskIndex = parseInt(id ? id : "0");
  const hoursMinSecs = {
    minutes: Math.floor(PREP_TIME_LIMIT / 60),
    seconds: PREP_TIME_LIMIT % 60,
  };
  const navigate = useNavigate();

  const [mode, setMode] = useState<"preparing" | "recording">("preparing");

  //go to login page if user hasn't entered credentials yet
  useEffect(() => {
    if (!user) {
      navigate("/" + SCREENS.LOGIN);
    }
  });

  //start recording automatically after PREP_TIME_LIMIT
  useEffect(() => {
    setTimeout(() => {
      setMode("recording");
    }, PREP_TIME_LIMIT * 1000);
  });

  if (id == undefined) {
    return null;
  }

  const task = data[taskIndex];

  return (
    <>
      {mode == "preparing" ? (
        <Stack
          padding={5}
          margin={5}
          border="1px solid #808080"
          borderRadius={2}
        >
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

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingBottom: "1%",
              }}
            >
              <CountDownTimer hoursMinSecs={hoursMinSecs} />
              <img
                style={{ paddingLeft: "0.5%" }}
                src={require("../images/Clock.png")}
                className="img"
                alt="clock icon"
              />
            </div>
          </Stack>
          <Stack spacing={10} mt={5}>
            <Stack>
              <Typography variant="button">{task.category}</Typography>
              <Typography variant="h3">{task.title}</Typography>
              <Typography variant="body1">{task.description}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h6">
                The problem you have chosen is:
              </Typography>
              <Typography variant="body1">{task.problem}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h6">
                Your task is to do the following:
              </Typography>
              {task.task.map((t) => (
                <Typography variant="body1">{" >    " + t}</Typography>
              ))}
            </Stack>
          </Stack>
          <Stack mt={5}>
            <Button variant="contained" onClick={() => setMode("recording")}>
              Start Recording
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Webcam task={task} />
      )}
    </>
  );
}

export default Task;
