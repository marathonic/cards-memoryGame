import React from "react";
import data from "./data";

export default function ScoreBoard(props) {
  const { score, highScore } = props;

  return (
    <div className="score-board">
      <div>
        <span>Score: {score}</span>
      </div>
      {/* <div className="max-score">
        <span>
          MAX
          <br />
          {data.length}
        </span>
      </div> */}
      <div>
        <span>High score: {highScore}</span>
      </div>
    </div>
  );
}
