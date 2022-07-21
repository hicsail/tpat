import * as React from "react";

import Card from "../components/Card";
import data from "../data.json";

function TryItYourself() {
  return (
    <div>
      <div
        style={{
          padding: "30px",
          display: "flex",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontWeight: "normal",
            fontSize: "20px",
            paddingTop: "50px",
            justifyContent: "center",
            display: "flex",
            width: "35%",
            textAlign: "center",
            lineHeight: "2.5rem",
          }}
        >
          Introductory Title / Text, or some inspiration starter text some
          inspiration starter text
        </h1>
      </div>

      <div style={{ padding: "10px", display: "flex" }}>
        <p
          style={{
            justifyContent: "center",
            display: "flex",
            fontSize: "15px",
            width: "45%",
            textAlign: "center",
            lineHeight: "1.75rem",
          }}
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters.
        </p>
      </div>

      <hr
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "1.5%" }}
      ></hr>
      {data.map((taskDetail, index) => {
        return (
          <Card
            title={taskDetail.title}
            description={taskDetail.description}
            time={taskDetail.time}
            id={taskDetail.id}
          />
        );
      })}
    </div>
  );
}

export default TryItYourself;
