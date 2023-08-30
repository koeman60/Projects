import React, { useEffect, useCallback } from "react";
import Key from "./Key";
import { useContext } from "react";
import { AppContext } from "../App";

function Keyboard() {
  const { onDelete, onEnter, onSelectLetter } = useContext(AppContext);

  const keyRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((e) => {
    if (e.key === "Enter") {
      onEnter();
    } else if (e.key === "Backspace") {
      onDelete();
    } else {
      keyRow1.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keyRow2.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keyRow3.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keyRow1.map((letter) => {
          return <Key keyVal={letter} />;
        })}
      </div>
      <div className="line2">
        {keyRow2.map((letter) => {
          return <Key keyVal={letter} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keyRow3.map((letter) => {
          return <Key keyVal={letter} />;
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
