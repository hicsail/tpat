import { useEffect, useState } from "react";
import { TaskHistory } from "../components/VideoRecorder";
import { STORAGE_KEYS } from "../constants/storageKeys";
const TAG = "useTaskHistory.tsx ";

const useTaskHistory = (taskId = -1) => {
  const [taskHistory, setTaskHistory] = useState<TaskHistory>({});

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

  return [taskHistory, setTaskHistory];
};

export { useTaskHistory };
