import React, { useState } from "react";
import Modal from "react-modal";
//import Modal from "../components/Modal";

Modal.setAppElement("#root");

function Tutorial() {
  const hoursMinSecs = { minutes: 7, seconds: 0 };
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
              class="img"
              alt="arrow icon"
            />
            <a
              style={{
                textDecoration: "none",
                color: "black",
                paddingLeft: "10%",
              }}
              href="/try-it-yourself"
            >
              Back
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingBottom: "1%",
            }}
          >
            7:00
            <img
              style={{ paddingLeft: "0.5%" }}
              src={require("../images/Clock.png")}
              class="img"
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
          Category
        </p>

        <h2
          style={{ paddingBottom: "1%", fontWeight: "bold", paddingLeft: "2%" }}
        >
          Task Title
        </h2>
        {hoursMinSecs ? (
          <h3
            style={{
              paddingBottom: "1%",
              fontWeight: "normal",
              paddingLeft: "2%",
            }}
          >
            Description
          </h3>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "3%",
          marginBottom: "3%",
        }}
      >
        <a
          style={{
            border: "2px solid #e26c40",
            padding: "1%",
            color: "#e26c40",
            borderRadius: "15%",
            textDecoration: "none",
          }}
          href="/tutorial2"
        >
          Start Recording
        </a>
      </div>
    </div>
  );
}

export default Tutorial;
