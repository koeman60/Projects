import wordle from "./wordleWordBank.txt";

export const defaultBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const gernerateWordSet = async () => {
  let wordSet;
  await fetch(wordle)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\n");
      wordSet = new Set(wordArray);
      console.log(wordSet);
    });
  return { wordSet };
};
