import * as React from "react";
import data from "../data.json";
import { useParams } from "react-router-dom";
import CountDownTimer from "../components/Timer";

function Task() {
  // Get ID from URL
  const { id } = useParams();
  const hoursMinSecs = { minutes: 6 };

  //<div>Task {id}</div>
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
            <CountDownTimer hoursMinSecs={hoursMinSecs} />
            <img
              style={{ paddingLeft: "0.5%" }}
              src={require("../images/Clock.png")}
              class="img"
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
          {data[id - 1].category}
        </p>

        <h2
          style={{ paddingBottom: "1%", fontWeight: "bold", paddingLeft: "2%" }}
        >
          {data[id - 1].title}
        </h2>
        <h2
          style={{
            paddingBottom: "1%",
            fontWeight: "normal",
            paddingLeft: "2%",
          }}
        >
          {data[id - 1].description}
        </h2>
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
            border: "2px solid #57d655",
            padding: "1%",
            color: "#57d655",
            borderRadius: "15%",
            textDecoration: "none",
          }}
          href={`/webcam/${id}`}
        >
          Next
        </a>
      </div>
    </div>
  );
}

export default Task;
