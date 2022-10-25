import Box from "@material-ui/core/Box";
import { Container, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import { SCREENS } from "../constants/screens";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { data } from "../data";
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

  const [camMicCheckCompleted, setCamMicCheckCompleted] = useState(false);

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
      {camMicCheckCompleted ? (
        <div></div>
      ) : (
        //   data.map((taskDetail, index) => {
        //   return (
        //     <Card
        //       key={taskDetail.id}
        //       title={taskDetail.title}
        //       preview={taskDetail.preview}
        //       previewImage={taskDetail.previewImage}
        //       time={taskDetail.time}
        //       id={taskDetail.id}
        //     />
        //   );
        // })

        <Card
          key={data[1].id}
          title={data[1].title}
          preview={data[1].preview}
          previewImage={data[1].previewImage}
          time={"5s"}
          id={"-1"}
        />
      )}
    </div>
  );
}

export default TryItYourself;
