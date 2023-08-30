import React from "react";
import { Actions } from "./App";

export default function Operation({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.ChooseOp, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
