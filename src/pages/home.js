import * as React from "react";
import "../App.css";

const title = "Try out practices. Assess skills. See growth";
const subtitle =
  "We focus on the assessment of teacher practices through brief, standardized tasks. We give opportunities to educators to practice important competencies, receive feedback, and track their growth.";
const categories = [
  {
    title: "Try Tasks",
    subtitle:
      "Teachers and preservice educators can record themselves enacting a professional competency by responding toa scenario created by researchers and teacher educators. This valuable experience provides the opportunity to practice using important professional competencies and to receive feedback on teacher practices.",
  },
  {
    title: "Administer Tasks",
    subtitle:
      "Tasks can be created by teacher educators, researchers and for professional development. Tasks can be created to show growth or evaluate critical teacher skills prior to enactment in the classroom.",
  },
];
function Home() {
  return (
    <div>
      <div className="body">
        <div className="container">
          <h2 style={{ paddingBottom: "8%" }}>{title}</h2>
          <p>{subtitle}</p>
          <div style={{ paddingTop: "5%" }}>
            <a
              style={{
                border: "2px solid #E26C40",
                padding: "2.5%",
                color: "#E26C40",
                borderRadius: "10px",
                textDecoration: "none",
              }}
              href="try-it-yourself"
            >
              Try It Yourself
            </a>
          </div>
        </div>
      </div>
      <h2 className="subtitle">Service that TPAT provides</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="secondContainer">
          <div className="row">
            <div className="column">
              <img
                src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                alt="promotional 1"
              />

              <h1 style={{ paddingTop: "5%" }}>{categories[0].title}</h1>
              <p style={{ paddingTop: "5%" }}>{categories[0].subtitle}</p>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <img
                src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
                alt="promotional 2"
              />

              <h1 style={{ paddingTop: "5%" }}>{categories[1].title}</h1>
              <p style={{ paddingTop: "5%" }}>{categories[1].subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
