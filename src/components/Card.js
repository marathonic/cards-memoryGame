import React from "react";
import "../style.css";

const Card = (props) => {
  const { picture, cardName, playCard } = props;

  return (
    <div className="card">
      <img
        src={picture}
        id={cardName}
        alt="test"
        onClick={() => playCard(cardName)}
      />
    </div>
  );
};

export default Card;
