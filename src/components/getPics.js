import React from "react";

const getPics = () => {
  let pics = [];
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => pics.push(data.results[0].picture.large))
    .then(console.log(pics));
  return pics;
};

export default getPics;
