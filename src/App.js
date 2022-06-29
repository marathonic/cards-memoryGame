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
      //Make a deck where each card only shows up once
      const newDeck = [];
      for (let i = 0; newDeck.length < 4; i++) {
        let randomNumber = Math.floor(Math.random() * data.length);
        let cardObj = data[randomNumber];
        if (newDeck.indexOf(cardObj) === -1) {
          newDeck.push(cardObj);
        }
        //But what if all the cards shown on deck
        //have been played before,
        //while there's still unshown cards that didn't come up?
        //The player would lose unfairly. Let's fix that.
        //If new unshown cards, ensure at least 1 card on deck is new:
        if (newDeck.length === 3) {
          console.log(newDeck);
          // if(newDeck.every(cardObject => ))
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

  useEffect(getRandomDeck, [previouslyPlayed]);

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
      console.log(newArr);
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
