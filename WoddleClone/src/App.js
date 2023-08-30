import "./App.css";
import React, { useState, useEffect } from "react";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import { defaultBoard, gernerateWordSet } from "./Words";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [board, setboard] = useState(defaultBoard);
  const correctWord = "RIGHT";
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    gernerateWordSet().then((words) => {
      console.log(words);
      setWordSet(words.wordSet);
    });
  }, []);

  console.log(wordSet);

  function onSelectLetter(keyVal) {
    if (currentAttempt.letterPos > 4) return;
    const currBoard = [...board];
    currBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setboard(currBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  }

  function onEnter() {
    if (currentAttempt.letterPos !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    console.log(currentWord.toLowerCase());
    console.log(wordSet.has("abase"));

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPos: 0,
      });
    } else {
      alert("Word Not Found!!!");
    }
  }

  function onDelete() {
    if (currentAttempt.letterPos === 0) return;
    const currBoard = [...board];
    currBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setboard(currBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setboard,
          currentAttempt,
          correctWord,
          setCurrentAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
