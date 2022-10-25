import { Container, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import { SCREENS } from "../constants/screens";
import { camMicCheckTask, data } from "../data";
import { UserContext } from "../store/UserContext";

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
        <Typography variant="h6" textAlign="center" mt={10} fontWeight={800}>
          {subtitle}
        </Typography>
        <Typography variant="body1" textAlign="center" mt={2}>
          Note: Your camera and audio will be recording for the tutorial and
          tasks. We suggest you are in a quiet room where you can give attention
          to and have few distractions from the tasks.
        </Typography>
        <Typography variant="body1" textAlign="center" mt={2}>
          For videos to save correctly, you must use your desktop and we
          recommend the Google Chrome browser. Using a mobile device or other
          browsers may cause errors or data loss
        </Typography>
      </Container>
      <hr
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "1.5%" }}
      ></hr>
      {user && user.camMicCheckComplete ? (
        <div>
          {data.map((taskDetail, _) => {
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
      ) : (
        <Card
          key={camMicCheckTask.id}
          title={camMicCheckTask.title}
          preview={camMicCheckTask.preview}
          previewImage={camMicCheckTask.previewImage}
          time={camMicCheckTask.time}
          id={camMicCheckTask.id}
        />
      )}
    </div>
  );
}

export default TryItYourself;
