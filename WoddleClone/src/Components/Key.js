import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey }) {
  const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

  function selectLetter() {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  }

  return (
    <div className="key" Id={bigKey && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
