import { data } from "../data";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountDownTimer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { SCREENS } from "../constants/screens";
import { TaskHistory } from "../components/VideoRecorder";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PREP_TIME_LIMIT } from "../config/config";
import { STORAGE_KEYS } from "../constants/storageKeys";
import TaskView from "../components/TaskView";

function Task() {
  const { user } = useContext(UserContext);

  // Get ID from URL
  const { id } = useParams();
  const taskId = id ? id : "0";
  const hoursMinSecs = {
    minutes: Math.floor(PREP_TIME_LIMIT / 60),
    seconds: PREP_TIME_LIMIT % 60,
  };
  const navigate = useNavigate();

  const [mode, setMode] = useState<"preparing" | "recording">("preparing");
  const [taskHistory, setTaskHistory] = useState<TaskHistory>({});

  const TAG = "Task.tsx ";
  // localStorage.removeItem(STORAGE_KEYS.TASK_ATTEMPT_HISTORY);
  //go to login page if user hasn't entered credentials yet
  useEffect(() => {
    if (!user) {
      navigate("/" + SCREENS.LOGIN);
    }
  }, []);

  //start recording automatically after PREP_TIME_LIMIT
  useEffect(() => {
    const prepTimer = setTimeout(() => {
      setMode("recording");
    }, PREP_TIME_LIMIT * 1000);
    return () => {
      clearTimeout(prepTimer);
    };
  }, []);

  //  record firstViewed (in  attempt history ). TODO extract into a hook
  useEffect(() => {
    const taskHistoryString = localStorage.getItem(
      STORAGE_KEYS.TASK_ATTEMPT_HISTORY
    );
    var taskHistory: TaskHistory;
    if (taskHistoryString) {
      taskHistory = JSON.parse(taskHistoryString);
      if (taskHistory) {
        console.log(TAG, "retrieved task history from storage:", taskHistory);
        if (!taskHistory[taskId]) {
          taskHistory[taskId] = {
            attempts: 0,
            firstViewed: new Date().toLocaleString(),
          };
        }
      }
    } else {
      taskHistory = {
        [taskId]: { attempts: 0, firstViewed: new Date().toLocaleString() },
      };
    }
    console.log(TAG, "taskHistory:", taskHistory);
    localStorage.setItem(
      STORAGE_KEYS.TASK_ATTEMPT_HISTORY,
      JSON.stringify(taskHistory)
    );
    setTaskHistory(taskHistory);
  }, []);

  useEffect(() => {
    if (mode == "recording") {
      //  update attempt history
      const updatedHistoryForCurrentTask = {
        ...taskHistory[taskId],
        attempts: taskHistory[taskId].attempts + 1,
      };
      const updatedTaskHistory = {
        ...taskHistory,
        [taskId]: updatedHistoryForCurrentTask,
      };
      setTaskHistory(updatedTaskHistory);
      console.log(TAG, "updatedTaskHistory:", updatedTaskHistory);
      localStorage.setItem(
        STORAGE_KEYS.TASK_ATTEMPT_HISTORY,
        JSON.stringify(updatedTaskHistory)
      );
    }
  }, [mode]);

  if (id == undefined) {
    return null;
  }

  const task = data.find((t) => t.id == taskId);

  if (task == undefined) {
    return <Typography variant="h6">Task not found</Typography>;
  }
  return (
    <Box margin={5}>
      {mode == "preparing" ? (
        <Stack padding={5} border="1px solid #808080" borderRadius={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: "1%",
              }}
            >
              <CountDownTimer hoursMinSecs={hoursMinSecs} />
              <img
                style={{ paddingLeft: "0.5%" }}
                src={require("../images/Clock.png")}
                className="img"
                alt="clock icon"
              />
            </div>
          </Stack>
          <Stack spacing={10} mt={5}>
            <Stack>
              <Typography variant="button">{task.category}</Typography>
              <Typography variant="h3">{task.title}</Typography>
              <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                {task.description}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h6">
                The problem you have chosen is:
              </Typography>
              <Typography variant="body1">{task.problem}</Typography>
              {task.imgURL && (
                <div className="img-container">
                  <img
                    style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
                    src={task.imgURL}
                    alt="task visualization"
                  />
                </div>
              )}
            </Stack>
            <Stack>
              <Typography variant="h6">
                Your task is to do the following:
              </Typography>
              <Typography variant="body1" fontWeight={800}>
                {task.task}
              </Typography>
              <Typography variant="h6" mt={2} fontWeight={800}>
                Remember to:
              </Typography>
              {task.prompts.map((t, index) => (
                <Typography key={index.toString()} variant="body1">
                  {" >    " + t}
                </Typography>
              ))}
            </Stack>
          </Stack>
          <Stack mt={5}>
            <Button variant="contained" onClick={() => setMode("recording")}>
              Start Recording
            </Button>
          </Stack>
        </Stack>
      ) : (
        <TaskView task={task} taskHistory={taskHistory[taskId]} />
      )}
    </Box>
  );
}

export default Task;
