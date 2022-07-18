import * as React from "react";
import { useParams } from "react-router-dom";

function Instruction(props) {
  const { id } = useParams();

  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%",
      }}
    >
      <div style={{ marginLeft: "5%", marginTop: "2%", paddingBottom: "3%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "2%",
            marginBottom: "2%",
            paddingTop: "1%",
          }}
        >
          <h1>Instruction</h1>
        </div>
        <div style={{ paddingBottom: "4%" }}>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>

        <div>
          <a
            href={`/task/${id}`}
            style={{
              border: "2px solid #e26c40",
              padding: "1%",
              color: "#e26c40",
              borderRadius: "20%",
              textDecoration: "none",
            }}
            id={props.id}
            name="Next"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
