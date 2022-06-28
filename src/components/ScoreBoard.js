import React from "react";
export default function ScoreBoard(props) {
  const { score, highScore } = props;

  return (
    <div className="score-board">
      <span>Score: {score}</span>
      <div>
        <span>High score: {highScore}</span>
      </div>
    </div>
  );
}
