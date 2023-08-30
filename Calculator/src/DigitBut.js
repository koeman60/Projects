import React from "react";
import { Actions } from "./App";

export default function Button({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.AddDigit, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
