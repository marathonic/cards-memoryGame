import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.picture.large} alt="test"></img>
    </div>
  );
};

export default Card;
