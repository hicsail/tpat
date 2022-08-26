import React from "react";

const Btn = (props) => {
  return (
    <div>
      <a href={`/task/${props.id}`}>
        <button className="btn">{props.name}</button>
      </a>
    </div>
  );
};

export default Btn;
