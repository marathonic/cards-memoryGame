import React, { useState, useEffect } from "react";
import data from "./data";
import Card from "./Card";

const Deck = () => {
  const [previouslyPlayed, setPreviouslyPlayed] = useState([]);

  const playCard = (nameOfCard) => {
    // setPreviouslyPlayed((prevCards) => [...prevCards, nameOfCard]);
    setPreviouslyPlayed((prevCards) => {
      const newArr = [];
      if (prevCards.includes(nameOfCard)) {
        console.log("played the same card twice");
        alert("Played twice");
      } else {
        newArr.push(...prevCards, nameOfCard);
      }
      return newArr;
    });
  };

  useEffect(() => {
    console.log(previouslyPlayed);
  }, [previouslyPlayed]);

  const scoreBoard = () => {
    //should we make our scoreBoard function here?
    //Is there a reason it should be in a separate file? Maybe if it's long enough it makes sense, but for now?
  };

  const myPics = data.map((obj) => {
    return (
      <Card picture={obj.image} cardName={obj.cardName} playCard={playCard} />
    );
  });

  return myPics;
};

export default Deck;
