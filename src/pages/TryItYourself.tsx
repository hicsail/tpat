import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import { SCREENS } from "../constants/screens";
import { data } from "../data";
import { UserContext } from "../store/UserContext";

const title =
  "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires. (William Arthur Ward)";
const subtitle = "Demonstrate your skills through the assigned tasks below.";

function TryItYourself() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/" + SCREENS.LOGIN);
    }
  });

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
          {title}
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
          {subtitle}
        </p>
      </div>

      <hr
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "1.5%" }}
      ></hr>
      {data.map((taskDetail, index) => {
        return (
          <Card
            key={taskDetail.id}
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
