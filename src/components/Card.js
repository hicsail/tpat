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
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          justifyContent: "flex-start",
          width: "80%",
          marginTop: "15px",
          height: "120px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            justifyContent: "flex-start",
            display: "flex",
            width: "18%",
            textAlign: "center",
            borderRadius: "10px 0px 0px 10px",
          }}
        >
          <img
            style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
            src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
          />
        </div>
        <div
          style={{
            paddingTop: "2%",
            paddingLeft: "2%",
            backgroundColor: "white",
            width: "80%",
          }}
        >
          <h4 style={{ backgroundColor: "transparent" }}>{props.title}</h4>
          <p style={{ backgroundColor: "transparent" }}>{props.description}</p>
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "inline",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "2%",
              backgroundColor: "transparent",
            }}
          >
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
            <Button id={props.id - 1} name="Start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
