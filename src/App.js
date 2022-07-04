import "./style.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import uniqid from "uniqid";
import Card from "./components/Card";
import data from "./components/data";
import ScoreBoard from "./components/ScoreBoard";
import Footer from "./components/Footer";

function App() {
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);
  const [unplayedCards, setUnplayedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    sessionStorage.getItem("topScore") === null
      ? 0
      : sessionStorage.getItem("topScore")
  );
  const [randomDeck, setRandomDeck] = useState([]);
  const [areCardsHidden, setCardsHidden] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [recordHolder, setrecordHolder] = useState(
    sessionStorage.getItem("recordHolderName") === null
      ? 1
      : sessionStorage.getItem("recordHolderName")
  );

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
            //get a new card that isn't in the array
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
        return;
      }

      unplayedArr.push(newUnplayed);
      return unplayedArr;
    });
  }

  useEffect(getRandomDeck, [previouslyPlayed, unplayedCards]);
  useEffect(updateUnplayedCards, [previouslyPlayed]);

  const playCard = (nameOfCard) => {
    setPreviouslyPlayed((prevCards) => {
      const newArr = [];

      if (previouslyPlayed.length === data.length || score === data.length) {
        newArr.push(...prevCards);
      } else if (prevCards.includes(nameOfCard)) {
        checkHighScore();
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

  const handleSubmit = (e) => {
    setrecordHolder(nameInput);
    sessionStorage.setItem("recordHolderName", nameInput);
    window.location.reload();
  };

  const checkHighScore = () => {
    setHighScore((prevHighScore) => {
      if (score >= prevHighScore) {
        sessionStorage.setItem("topScore", score);
        return score;
      } else {
        return prevHighScore;
      }
    });
  };

  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

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
      <ScoreBoard
        score={score}
        highScore={highScore}
        nameInput={
          recordHolder !== null && sessionStorage.getItem("recordHolderName")
        }
      />
      {!areCardsHidden ? <div className="cards-section">{myPics}</div> : null}
      {previouslyPlayed.length === data.length && (
        <div className="winner">
          <span>MAX</span>
          <span>score</span>
          <form onSubmit={handleSubmit}>
            <input
              className="hs-input"
              placeholder="Your Name"
              onChange={handleChange}
              value={nameInput}
              name="high-score-input"
            ></input>
            <button className="hs-btn">OK</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
