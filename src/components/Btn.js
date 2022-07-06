import React from "react";

const Btn = (props) => {
  return (
    <div>
      <a href={`/task/${props.id}`} title={props.title}>
        <button class="btn">{props.name}</button>
      </a>
    </div>
  );
};

export default Btn;
