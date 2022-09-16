import Box from "@material-ui/core/Box";
import { Container, Typography } from "@mui/material";
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
const TAG = "TryItYourself.tsx ";

function TryItYourself() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  useEffect(() => {
    if (!user) {
      navigate("/" + SCREENS.LOGIN);
    }
  }, [user]);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h6" textAlign="center" mt={10}>
          {subtitle}
        </Typography>
      </Container>
      <hr
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "1.5%" }}
      ></hr>
      {data.map((taskDetail, index) => {
        return (
          <Card
            key={taskDetail.id}
            title={taskDetail.title}
            preview={taskDetail.preview}
            previewImage={taskDetail.previewImage}
            time={taskDetail.time}
            id={taskDetail.id}
          />
        );
      })}
    </div>
  );
}

export default TryItYourself;
