import { data } from "../data";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { SCREENS } from "../constants/screens";
import Webcam from "../components/Webcam";
import { Button } from "@mui/material";

function Task() {
  const { user } = useContext(UserContext);

  // Get ID from URL
  const { id } = useParams();
  const taskIndex = parseInt(id ? id : "0");
  const hoursMinSecs = { minutes: 5, seconds: 0 };
  const navigate = useNavigate();

  const [mode, setMode] = useState<"preparing" | "recording">("preparing");

  //start recording automacally after some time
  useEffect(() => {
    setTimeout(() => {
      setMode("recording");
      //1 second = 1000 millisecond
    }, 420000);
  });

  //go to login page if user hasn't entered credentials yet
  useEffect(() => {
    if (!user) {
      navigate("/" + SCREENS.LOGIN);
    }
  });

  if (id == undefined) {
    return null;
  }

  return (
    <>
      {mode == "preparing" ? (
        <div
          style={{
            border: "1px solid black",
            marginTop: "5%",
            marginLeft: "3%",
            marginRight: "3%",
          }}
        >
          <div
            style={{ marginLeft: "5%", marginTop: "2%", paddingBottom: "2%" }}
          >
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
                  to={"/" + SCREENS.TRY_IT_YOURSELF}
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
            </div>

            <p
              style={{
                paddingBottom: "1%",
                paddingTop: "1%",
                paddingLeft: "2%",
                color: "#B3B3B3",
              }}
            >
              {data[taskIndex].category}
            </p>

            <h2
              style={{
                paddingBottom: "1%",
                fontWeight: "bold",
                paddingLeft: "2%",
              }}
            >
              {data[taskIndex].title}
            </h2>

            <>
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "normal",
                  paddingLeft: "2%",
                }}
              >
                {data[taskIndex].description[0]}
              </h3>
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "normal",
                  paddingLeft: "2%",
                }}
              >
                {data[taskIndex].description[1]}
              </h3>
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "normal",
                  paddingLeft: "2%",
                }}
              >
                {data[taskIndex].description[2]}
              </h3>
            </>

            <div>
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "bold",
                  paddingLeft: "2%",
                  paddingTop: "2%",
                }}
              >
                The problem you have chosen is:
              </h3>
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "normal",
                  paddingLeft: "2%",
                }}
              >
                {data[taskIndex].problem}
              </h3>
            </div>

            {data[taskIndex].imgURL !== "#" ? (
              <img
                style={{ height: "150px", paddingLeft: "2%" }}
                src={data[taskIndex].imgURL}
                alt="task visualization"
              />
            ) : null}

            <div
              style={{
                height: "200px",
                //backgroundColor: "purple",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  paddingBottom: "1%",
                  fontWeight: "bold",
                  paddingLeft: "2%",
                  paddingTop: "2%",
                }}
              >
                Your task is to do the following:
              </h3>
              <div className="task">
                <ul>
                  <li>{data[taskIndex].task[0]}</li>
                  <br></br>
                  <li>{data[taskIndex].task[1]}</li>
                  <br></br>
                  <li>{data[taskIndex].task[2]}</li>
                  <br></br>
                  <li>{data[taskIndex].task[3]}</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "3%",
              marginBottom: "3%",
            }}
          >
            <Button variant="contained" onClick={() => setMode("recording")}>
              Start Recording
            </Button>
          </div>
        </div>
      ) : (
        <Webcam id={taskIndex} />
      )}
    </>
  );
}

export default Task;
