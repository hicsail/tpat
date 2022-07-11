import React from "react";
import Button from "../components/Btn";

const Card = (props) => {
  return (
    <div
      style={{
        //backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div class="card-container">
        <div class="img-container">
          <img
            style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
            src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
          />
        </div>
        <div class="task-container">
          <h4 style={{ backgroundColor: "transparent" }}>{props.title}</h4>
          <p style={{ backgroundColor: "transparent" }}>{props.description}</p>
          <div></div>
          <div class="time-container">
            <img src={require("../images/Clock.png")} class="img" />
            <p
              style={{
                fontSize: "13px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              {props.time}
            </p>
            <a
              href={`/task/${props.id}`}
              style={{
                border: "2px solid #57d655",
                padding: "1%",
                color: "#57d655",
                borderRadius: "20%",
                textDecoration: "none",
                marginBottom: "2%",
              }}
              id={props.id}
              name="Start"
            >
              Start
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
