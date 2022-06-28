import React from "react";
export default function ScoreBoard(props) {
  const { score } = props;

  return (
    <div className="score-board">
      <span>Score: {score}</span>
    </div>
  );
}
