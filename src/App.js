import "./style.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import uniqid from "uniqid";
import Card from "./components/Card";
import data from "./components/data";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [randomDeck, setRandomDeck] = useState([]);

  const getRandomDeck = () => {
    setRandomDeck((prevRandomDeck) => {
      // we COULD run it until it reaches data.length for easier adjustment later(slice right before mapping),
      // but that would be less performant, since we only need a few cards at a time.

      const newDeck = [];

      for (let i = 0; newDeck.length < 3; i++) {
        let randomNumber = Math.floor(Math.random() * data.length);
        let cardObj = data[randomNumber];
        if (newDeck.indexOf(cardObj) === -1) {
          newDeck.push(cardObj);
        }
      }
      return newDeck;
      // while (newDeck.length < 3) {
      //   let randomNumber = Math.floor(Math.random() * data.length);
      //   let cardObj = data[randomNumber];

      //   if (!prevRandomDeck.includes(cardObj)) {
      //     newDeck.push({ ...cardObj, prevRandomDeck });
      //   }
      // }
    });
  };

  useEffect(getRandomDeck, [score]);

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

  // let randomData = getRandomDeck();

  const myPics = randomDeck.map((obj) => {
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
