import "./App.css";
import Button from "./DigitBut";
import Operation from "./Operation";
import "./styles.css";
import { useReducer } from "react";

export const Actions = {
  AddDigit: "add-digit",
  Clear: "clear",
  Evaluate: "evaluate",
  Delete: "delete-digit",
  ChooseOp: "choose-operation",
};

function App() {
  const [{ curOp, prevOp, operation }, dispatch] = useReducer(reducer, {
    curOp: 0,
    prevOp: undefined,
    operation: undefined,
  });

  function reducer(state, { type, payload }) {
    if (type === Actions.AddDigit) {
      if (state.override === true) {
        console.log("override");
        return {
          ...state,
          curOp: payload.digit,
          prevOp: null,
          override: false,
        };
      }
      if (payload.digit === "0" && state.curOp === "0") {
        return state;
      }
      if (
        payload.digit !== "0" &&
        payload.digit !== "." &&
        state.curOp === "0"
      ) {
        return {
          ...state,
          curOp: payload.digit,
        };
      }
      if (state.curOp !== 0) {
        console.log("inside");
        if (payload.digit === "." && state.curOp.includes(".")) {
          return state;
        }
      }
      return {
        ...state,
        curOp: `${state.curOp || ""}${payload.digit}`,
      };
    }
    if (type === Actions.Clear) {
      return {
        ...state,
        curOp: 0,
        prevOp: null,
        operation: null,
        override: false,
      };
    }
    if (type === Actions.ChooseOp) {
      if (state.override === true) {
        console.log("override");
        return {
          ...state,
          operation: payload.operation,
          prevOp: state.curOp,
          curOp: 0,
          override: false,
        };
      }
      if (state.curOp === 0 && state.prevOp == null) {
        return state;
      }
      if (state.prevOp == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOp: state.curOp,
          curOp: 0,
        };
      }
      if (state.prevOp !== null && state.curOp !== 0) {
        console.log("con..");
        return {
          ...state,
          operation: payload.operation,
          prevOp: evaluate(state),
          curOp: 0,
        };
      }
      if (state.curOp === 0) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        prevOp: evaluate(state),
        operation: payload.operation,
        curOp: 0,
      };
    }
    if (type === Actions.Evaluate) {
      if (
        state.curOp === 0 ||
        state.prevOp == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        override: true,
        prevOp: `${state.prevOp} ${state.operation} ${state.curOp}`,
        curOp: evaluate(state),
        operation: null,
      };
    }
    if (type === Actions.Delete) {
      if (state.override) {
        return {
          override: false,
          prevOp: null,
          curOp: 0,
        };
      }
      if (state.curOp === 0) {
        return state;
      }
      if (state.curOp.length === 1 && state.curOp !== 0) {
        console.log("del");
        return {
          ...state,
          curOp: 0,
        };
      }
      return {
        ...state,
        curOp: state.curOp.slice(0, -1),
      };
    }
  }

  // const IntegerFormatter = new Intl.NumberFormat("en-us", {
  //   maximumFractionDigits: 0,
  // });

  // function FormatOperant(operand) {
  //   console.log("before1");
  //   if (operand == null) {
  //     return;
  //   }
  //   console.log("between1");
  //   if (operand === 0) {
  //     return 0;
  //   }
  //   console.log("after");
  //   const [integer, decimal] = operand.split(".");
  //   if (decimal == null) return IntegerFormatter.format(integer);
  //   return `${IntegerFormatter.format(integer)}${decimal}`;
  // }

  function evaluate({ curOp, prevOp, operation }) {
    const prev = parseFloat(prevOp);
    const cur = parseFloat(curOp);
    if (isNaN(prev) && isNaN(cur)) {
      return "";
    }
    let comp = "";
    if (operation === "+") {
      comp = prev + cur;
    } else if (operation === "-") {
      comp = prev - cur;
    } else if (operation === "*") {
      comp = prev * cur;
    } else if (operation === "/") {
      comp = prev / cur;
    }
    return comp;
  }
  return (
    <div className="App">
      <div className="calc-grid">
        <div className="output">
          <div className="prev">
            {prevOp} {operation}
          </div>
          <div className="curr">{curOp}</div>
        </div>
        <button
          className="span-2"
          onClick={() => dispatch({ type: Actions.Clear })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: Actions.Delete })}>DEL</button>
        <Operation operation="*" dispatch={dispatch} />
        <Button digit="1" dispatch={dispatch} />
        <Button digit="2" dispatch={dispatch} />
        <Button digit="3" dispatch={dispatch} />
        <Operation operation="/" dispatch={dispatch} />
        <Button digit="4" dispatch={dispatch} />
        <Button digit="5" dispatch={dispatch} />
        <Button digit="6" dispatch={dispatch} />
        <Operation operation="+" dispatch={dispatch} />
        <Button digit="7" dispatch={dispatch} />
        <Button digit="8" dispatch={dispatch} />
        <Button digit="9" dispatch={dispatch} />
        <Operation operation="-" dispatch={dispatch} />
        <Button digit="." dispatch={dispatch} />
        <Button digit="0" dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: Actions.Evaluate })}
          className="span-2"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
