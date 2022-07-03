import "./style.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import uniqid from "uniqid";
import Card from "./components/Card";
import data from "./components/data";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);
  const [unplayedCards, setUnplayedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [randomDeck, setRandomDeck] = useState([]);
  const [areCardsHidden, setCardsHidden] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const getRandomDeck = () => {
    setRandomDeck((prevRandomDeck) => {
      //Make a deck where each card only shows up once
      const newDeck = [];
      const cardNames = [];
      for (let i = 0; newDeck.length < 4; i++) {
        let randomNumber = Math.floor(Math.random() * data.length);
        let cardObj = data[randomNumber];
        let cardName = cardObj.cardName;
        if (newDeck.indexOf(cardObj) === -1) {
          newDeck.push(cardObj);
          cardNames.push(cardName);
        }
        if (newDeck.length === 3) {
          if (
            newDeck.every((card) => previouslyPlayed.includes(card.cardName))
          ) {
            // if (cardNames.every((card) => previouslyPlayed.includes(card))) {
            console.log("3 OF THESE CARDS HAVE BEEN PLAYED BEFORE");
            //get a new card that isn't in the array
            console.log("pulling a new card...");

            console.log(unplayedCards[0]); //<--- this is just data.js, why?
            newDeck.push(unplayedCards[0][0]);
          }
        }
      }
      return newDeck;
    });
  };

  const handleCardsHidden = () => {
    setCardsHidden(!areCardsHidden);
  };

  function updateUnplayedCards() {
    //Ok so what our updateUnplayedCards function is doing is
    //it's logging all the cards that haven't been played yet.
    setUnplayedCards(() => {
      const unplayedArr = [];
      //Get all the cards in data whose names are not in the previouslyPlayed stateful array.
      const newUnplayed = data.filter(
        (obj) => previouslyPlayed.indexOf(obj.cardName) === -1
      );

      if (
        newUnplayed === undefined ||
        newUnplayed === null ||
        newUnplayed.length === 0
      ) {
        checkHighScore();
        registerNewCard(false);
        handleCardsHidden();
        return ["FIRING UPDATE-UNPLAYED-CARDS AFTER SCORE IS MAX SCORE"];
      }

      //Should we spread out newUnplayed?
      //We could return an object so that we don't have to [0][0].cardName in our getRandomDeck function
      //like so: return {...prevUnplayed, newUnplayed}. Let's put that on hold for now though
      unplayedArr.push(newUnplayed);
      console.log("newUnplayed is: ");
      console.table(newUnplayed); //<-- This DOES know the last card we just played, it doesn't show it as unplayed.
      return unplayedArr;
    });
  }

  useEffect(getRandomDeck, [previouslyPlayed, unplayedCards]);
  useEffect(updateUnplayedCards, [previouslyPlayed]);

  const playCard = (nameOfCard) => {
    setPreviouslyPlayed((prevCards) => {
      const newArr = [];

      if (previouslyPlayed.length === data.length || score === data.length) {
        console.log("you win");
        newArr.push(...prevCards, "FIRING FROM PLAYCARD EVEN AT MAX SCORE");
      } else if (prevCards.includes(nameOfCard)) {
        checkHighScore();
        console.log("played the same card twice");
        registerNewCard(false);
      } else {
        newArr.push(...prevCards, nameOfCard);
        registerNewCard(true);
      }
      console.log(newArr);
      //OK SO WE'RE RETURNING
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

  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

  // let randomData = getRandomDeck();

  const myPics = randomDeck.map((obj) => {
    if (unplayedCards.length === 0 || previouslyPlayed.length === data.length) {
      return false;
    }

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
      <main>
        {!areCardsHidden ? <div className="cards-section">{myPics}</div> : null}
        {previouslyPlayed.length === data.length && (
          <div className="winner">
            <span>MAX</span>
            <span>score</span>
            <input
              className="hs-input"
              placeholder="Your Name"
              onChange={handleChange}
              value={nameInput}
            ></input>
            <button className="hs-btn">OK</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
