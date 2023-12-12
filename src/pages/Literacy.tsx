import { Container, Link, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./TryItYourself.css";
import Card from "../components/Card";
import { SCREENS } from "../constants/screens";
import { camMicCheckTask, data, camMicCheckTaskLitercy } from "../data";
import { UserContext } from "../store/UserContext";

const subtitle = "Demonstrate your skills through the assigned tasks below.";
const linkToTips =
  "https://bushare-my.sharepoint.com/:b:/g/personal/mannysa_bu_edu/ESsXAOn9L2ZGrjwX3wMtq80BUqPlOsk28hq1D2rPZPyWIg?e=ytksks";
const lindseyEmail = "lhmclean@bu.edu";
const TAG = "Literacy.tsx ";

function LiteracyPage() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/loginLiteracy");
    }
  }, [user]);

  return (
    <div>
      <Container maxWidth="md">
        <Typography
          variant="body1"
          textAlign="center"
          color={"blue"}
          fontWeight={600}
          mt={2}
        >
          Thank you for supporting our research by completing these tasks!
          Please refer to your emailed instructions to ensure you know which
          four tasks from the list below are required. You will not complete all
          of the tasks on this page. You also may not be completing the tasks in
          numerical order.
        </Typography>
        <Typography variant="body1" textAlign="center" color={"blue"} mt={2}>
          Failure to complete assigned tasks could result in delayed
          compensation and additional work required. If you have any questions,
          reach out to
          <Link href={"mailto:" + lindseyEmail} target="_blank">
            {" "}
            Lindsey McLean
          </Link>{" "}
          Don't forget to use{" "}
          <Link href={linkToTips} target="_blank">
            {" "}
            this tip sheet
          </Link>{" "}
          to support your tasks. Review this before you enter the tasks as the
          timer will begin immediately.
        </Typography>
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
          browsers may cause errors or data loss.
        </Typography>
      </Container>
      <hr
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "1.5%" }}
      ></hr>

      {user && user.camMicCheckComplete ? (
        <div>
          {data.map((taskDetail, _) => {
            if (parseInt(taskDetail.id) >= 7 ) {
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
            }
          })}
        </div>
      ) : (
        <Card
          key={camMicCheckTaskLitercy.id}
          title={camMicCheckTaskLitercy.title}
          preview={camMicCheckTaskLitercy.preview}
          previewImage={camMicCheckTaskLitercy.previewImage}
          time={camMicCheckTaskLitercy.time}
          id={camMicCheckTaskLitercy.id}
        />
      )}
    </div>
  );
}

export default LiteracyPage;
