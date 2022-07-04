import React from "react";
import "../style.css";

export default function ScoreBoard(props) {
  const { score, highScore, nameInput } = props;

  return (
    <div className="score-board">
      <div>
        <span>Score: {score}</span>
      </div>
      <div>
        <span>High score: {highScore}</span>
        <span className="winner-name">
          {nameInput !== null ? ` (${nameInput})` : ""}
        </span>
      </div>
    </div>
  );
}
