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
        //But what if all the cards shown on deck
        //have been played before,
        //while there's still unshown cards that didn't come up?
        //The player would lose unfairly. Let's fix that.
        //If new unshown cards, ensure at least 1 card on deck is new:

        //Maybe we'd like to do: if(newDeck.length === 3 && newUnplayed.length > 0)
        if (newDeck.length === 3) {
          //only run this if no new cards came out in the first 3 draws in the current deck,
          //that way we avoid the edge case of e.g: having only 3 new cards, and them being drawn first,
          //which would make it impossible to draw another new card, since we don't draw repeats.
          if (
            newDeck.every((card) => previouslyPlayed.includes(card.cardName))
          ) {
            // if (cardNames.every((card) => previouslyPlayed.includes(card))) {
            console.log("3 OF THESE CARDS HAVE BEEN PLAYED BEFORE");
            //get a new card that isn't in the array
            console.log("pulling a new card...");

            //FOUND SOMETHING!!! We're serving the unplayedCards in the same order we're setting them in data.js
            //So the order is always 1)Vraska, 2)Stoneforge Mystic, 3)Elspeth, etc...
            //So of course the line below always outputs Vraska! That's why we always get Vraska as a "new" card!
            //When we play a card, the other remaining unplayed cards jump back 1 step.
            //So if we have 1)Vraska, 2)Stoneforge, 3) Elspeth,
            //and we click Stoneforge, then we get 1)Vraska, 2)Elspeth, etc.
            //We need to make it random every time

            //FOUND SOMETHING ELSE: Even if we play Vraska and it stops showing up in the unplayed table we're
            //logging to console, when the condition activates that logs: "3 OF THESE CARDS HAVE BEEN PLAYED BEFORE",
            //"pulling a new card..." we always get back Vraska anyway, even if it's no longer in the unplayedCards array. Hmmm...

            console.log(unplayedCards[0]); //<--- this is just data.js, why?
            //it seems that this function doesn't know that unplayedCards has updated from its initial state.
            //This DOES NOT know the last card we've played, it doesn't update it right away, only after another turn, so 2 turns instead of 1.

            //So App.js line 60 (the console log above) tells us the card we just picked, hasn't been clicked yet.
            //Whereas App.js line 102 shows us the updated array, WITHOUT the card we've just clicked.
            //I think it has to do with the dependencies array for the useEffect that runs updateUnplayedCards
            newDeck.push(unplayedCards[0][0]);
            // newDeck.splice(2, 1, newlyMinted); <-- need a stateful array like previouslyPlayed(but that records nameOfCard)
            // but recording the names of the images instead, so that we can check if that stateful array includes it,
            // and if that stateful array doesn't include it, then that means that card hasn't been played it, so it's new!
            // console.log("your new card would be: " + newlyMinted);
          }
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

  function updateUnplayedCards() {
    //Ok so what our updateUnplayedCards function is doing is
    //it's logging all the cards that haven't been played yet.
    setUnplayedCards(() => {
      const unplayedArr = [];
      //Get all the cards in data whose names are not in the previouslyPlayed stateful array.
      const newUnplayed = data.filter(
        (obj) => previouslyPlayed.indexOf(obj.cardName) === -1
      );

      const randomizedUnplayed = [];

      //Should we spread out newUnplayed?
      //We could return an object so that we don't have to [0][0].cardName in our getRandomDeck function
      //like so: return {...prevUnplayed, newUnplayed}. Let's put that on hold for now though
      unplayedArr.push(newUnplayed);
      console.log("newUnplayed is: ");
      console.table(newUnplayed); //<-- This DOES know the last card we just played, it doesn't show it as unplayed.
      // console.log("unplayedArr is: ");
      // console.table(unplayedArr); //<-- This DOES know the last card we just played, it doesn't show it as unplayed.

      //Because all previouslyPlayed cards come out at random, this array of unplayed cards will also be random.
      //Since we update previouslyPlayed {card1, card2, card3, etc...} when we click on a card,
      //that means that our newUnplayed array will be different each time its map function runs,
      //so each time it runs it'll remove the previous card, since it will show up in previouslyPlayed
      return unplayedArr;
    });
  }

  useEffect(getRandomDeck, [previouslyPlayed, unplayedCards]);
  useEffect(updateUnplayedCards, [previouslyPlayed]);

  const playCard = (nameOfCard) => {
    setPreviouslyPlayed((prevCards) => {
      const newArr = [];

      if (previouslyPlayed.length === data.length) {
        console.log("you win");
        return;
      } else if (prevCards.includes(nameOfCard)) {
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
      {unplayedCards.length > 0 && (
        <div className="cards-section">{myPics}</div>
      )}
    </div>
  );
}

export default App;
