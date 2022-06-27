import "./style.css";
import React from "react";
import Header from "./components/Header";
import Deck from "./components/Deck";
import uniqid from "uniqid";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="cards-section">
        <Deck />
      </div>
    </div>
  );
}

export default App;
