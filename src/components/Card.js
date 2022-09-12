import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const buttonStyle = {
    border: "2px solid #e26c40",
    padding: "1%",
    color: "#e26c40",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "2%",
  };
  return (
    <div
      style={{
        //backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="card-container">
        <div className="img-container">
          <img
            style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
            src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
            alt="task visualization"
          />
        </div>
        <div className="task-container">
          <h4 style={{ backgroundColor: "transparent" }}>{props.title}</h4>
          <p
            style={{
              backgroundColor: "transparent",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxHeight: "100px",
            }}
          >
            {props.description}
          </p>
          <div></div>
          <div className="time-container">
            <img
              src={require("../images/Clock.png")}
              className="img"
              alt="clock icon"
            />
            <p
              style={{
                fontSize: "13px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              {props.time}
            </p>
            {props.id === "0" ? (
              <Link
                to={"/tutorial"}
                style={buttonStyle}
                id={props.id}
                name="Start"
              >
                Start
              </Link>
            ) : (
              <Link
                style={{
                  border: "2px solid #e26c40",
                  padding: "1%",
                  color: "#e26c40",
                  borderRadius: "5px ",
                  textDecoration: "none",
                  marginBottom: "2%",
                }}
                id={props.id}
                name="Start"
                to={`/task/${props.id}`}
              >
                Start
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
