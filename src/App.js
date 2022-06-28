import "./style.css";
import React, { useState } from "react";
import Header from "./components/Header";
import uniqid from "uniqid";
import Card from "./components/Card";
import data from "./components/data";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const playCard = (nameOfCard) => {
    setPreviouslyPlayed((prevCards) => {
      const newArr = [];

      if (prevCards.includes(nameOfCard)) {
        checkHighScore();
        console.log("played the same card twice");
        registerNewCard(false);
      } else {
        newArr.push(...prevCards, nameOfCard);
        registerNewCard(true);
      }

      return newArr;
    });
  };

  const registerNewCard = (isCardNew) => {
    isCardNew ? setScore((prevScore) => score + 1) : setScore(0);
  };

  const checkHighScore = () => {
    setHighScore((prevHighScore) => {
      if (score >= prevHighScore) {
        return score;
      } else {
        return prevHighScore;
      }
    });
  };

  const myPics = data.map((obj) => {
    return (
      <Card
        picture={obj.image}
        cardName={obj.cardName}
        playCard={playCard}
        key={uniqid()}
      />
    );
  });

  return (
    <div className="app-container">
      <Header />
      <ScoreBoard score={score} highScore={highScore} />
      <div className="cards-section">{myPics}</div>
    </div>
  );
}

export default App;
