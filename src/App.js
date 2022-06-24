import "./style.css";
import React from "react";
import Header from "./components/Header";
import Cards from "./components/Cards";
import getPics from "./components/getPics";
import Card from "./components/Card";

function App() {
  const pics = getPics();
  const mappedPics = pics.map((pic) => {
    return <Card {...[pics]} />;
  });

  return (
    <div className="app-container">
      <Header />
      {/* <Card {...} /> */}
      <div className="cards-section">{mappedPics}</div>
    </div>
  );
}

export default App;
