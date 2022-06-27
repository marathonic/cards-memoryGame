import React from "react";

const getPicsFromAPI = () => {
  let pics = [];
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    // .then((data) => pics.push(data.results[0].picture.large))
    .then((data) =>
      data.map((pic) => {
        return pics.push(pic.image);
      })
    )
    .then(console.log(pics));
  return pics;
};

export default getPicsFromAPI;
