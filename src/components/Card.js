import { Link } from "react-router-dom";
import { SCREENS } from "../constants/screens";

const Card = (props) => {
  const buttonStyle = {
    border: "2px solid #e26c40",
    padding: "1%",
    color: "#e26c40",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "2%",
  };

  var destination = "/" + SCREENS.TASK;
  switch (props.id) {
    case "-1":
      destination = "/" + SCREENS.CAM_MIC_CHECK;
      break;
    case "0":
      destination = "/" + SCREENS.TUTORIAL;
      break;

    default:
      destination = "/" + SCREENS.TASK + "/" + props.id;
      break;
  }

  return (
    <div
      style={{
        //backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="card-container">
        <div className="img-container">
          <img
            style={{ width: "100%", borderRadius: "10px 0px 0px 10px" }}
            src={props.previewImage}
            alt="task visualization"
          />
        </div>
        <div className="task-container">
          <h4 style={{ backgroundColor: "transparent" }}>{props.title}</h4>
          <p
            style={{
              backgroundColor: "transparent",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxHeight: "100px",
            }}
          >
            {props.preview}
          </p>
          <div></div>
          <div className="time-container">
            <img
              src={require("../images/Clock.png")}
              className="img"
              alt="clock icon"
            />
            <p
              style={{
                fontSize: "13px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              {props.time}
            </p>
            {/* go to mic/check if id == -1 */}
            <Link
              to={destination}
              style={buttonStyle}
              id={props.id}
              target={"_blank"}
              name="Start"
            >
              Start
            </Link>
            {/* {props.id === "0" ? (
              <Link
                to={destination}
                style={buttonStyle}
                id={props.id}
                target={"_blank"}
                name="Start"
              >
                Start
              </Link>
            ) : (
              <Link
                style={{
                  border: "2px solid #e26c40",
                  padding: "1%",
                  color: "#e26c40",
                  borderRadius: "5px ",
                  textDecoration: "none",
                  marginBottom: "2%",
                }}
                id={props.id}
                name="Start"
                target={"_blank"}
                to={`/task/${props.id}`}
              >
                Start
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
