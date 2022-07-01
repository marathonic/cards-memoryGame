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
  const [allPreviousCardObj, setAllPreviousCardObj] = useState([]);

  const getRandomDeck = () => {
    setRandomDeck((prevRandomDeck) => {
      //Make a deck where each card only shows up once
      const newDeck = [];
      const cardNames = [];
      for (let i = 0; newDeck.length < 4; i++) {
        let randomNumber = Math.floor(Math.random() * data.length);
        let cardObj = data[randomNumber];
        let cardName = cardObj.cardName;
        //If still any unshown cards left, ensure at least 1 card on deck is new:
        if (newDeck.length === 3) {
          const checker = (arr, dataArr) =>
            dataArr.every((obj) => arr.includes(obj.cardName));
          if (checker(previouslyPlayed, data)) {
            console.log("3 OF THESE HAVE BEEN PLAYED BEFORE");
            //No we don't need to replace the last element, bc we're running the if statement when there's 1 spot left to fill.
            //Actually, we still do want the stateful array, we need it to make sure the next card hasn't been played before.
            // newDeck.splice(2, 1, newlyMinted); <-- need a stateful array like previouslyPlayed(but that records nameOfCard)
            // but recording the names of the images instead, so that we can check if that stateful array includes it,
            // and if that stateful array doesn't include it, then that means that card hasn't been played it, so it's new!
            newDeck.push(
              (obj) => previouslyPlayed.indexOf(obj.cardName) === -1
            );
          }
        }
        if (newDeck.indexOf(cardObj) === -1) {
          newDeck.push(cardObj);
          cardNames.push(cardName);
        }
      }
      return newDeck;
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
