import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountDownTimer = ({ hoursMinSecs }) => {
  const { minutes = 0, seconds = 0 } = hoursMinSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);
  const navigate = useNavigate();



  const tick = () => {
    if (mins === 0 && secs === 0) {
      return true;
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
