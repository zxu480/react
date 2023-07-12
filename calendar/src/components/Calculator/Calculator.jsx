import React, { useRef, useState } from "react";
import "./style.css";

const priorityMap = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [shouldReset, setShouldReset] = useState(false);

  const numStack = useRef([]);
  const opStack = useRef([]);

  const handleNumberClick = (value) => {
    if (displayValue === "0" || shouldReset) {
      setDisplayValue(value);
      setShouldReset(false);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleOperatorClick = (op) => {
    numStack.current.push(Number(displayValue));
    while (
      opStack.current.length &&
      priorityMap[opStack.current.at(-1)] >= priorityMap[op]
    ) {
      const num2 = numStack.current.pop();
      const num1 = numStack.current.pop();
      const prevOp = opStack.current.pop();
      numStack.current.push(evaluate(num1, num2, prevOp));
    }
    opStack.current.push(op);
    setShouldReset(true);
    setDisplayValue(numStack.current.at(-1));
  };

  const handleEqualsClick = () => {
    numStack.current.push(Number(displayValue));
    while (opStack.current.length) {
      const num2 = numStack.current.pop();
      const num1 = numStack.current.pop();
      const prevOp = opStack.current.pop();
      numStack.current.push(evaluate(num1, num2, prevOp));
    }
    setDisplayValue(numStack.current.at(-1));
    setShouldReset(true);
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    numStack.current = [];
    opStack.current = [];
  };

  const handleToggleSignClick = () => {
    if (displayValue[0] !== "-") {
      setDisplayValue("-" + displayValue);
    } else {
      setDisplayValue(displayValue.substring(1));
    }
  };

  const handlePersentageClick = () => {
    setDisplayValue(String(Number(displayValue) / 100));
  };

  const evaluate = (num1, num2, op) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return NaN;
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-panel">
        <button className="calculator-cell" onClick={handleClearClick}>
          AC
        </button>
        <button className="calculator-cell" onClick={handleToggleSignClick}>
          +/-
        </button>
        <button className="calculator-cell" onClick={handlePersentageClick}>
          %
        </button>
        <button
          className="calculator-cell cell-operator"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>

        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
        <button
          className="calculator-cell cell-operator"
          onClick={() => handleOperatorClick("*")}
        >
          &times;
        </button>

        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
        <button
          className="calculator-cell cell-operator"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>

        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          className="calculator-cell"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
        <button
          className="calculator-cell cell-operator"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>

        <button
          className="calculator-cell cell-zero"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button className="calculator-cell" onClick={handleDecimalClick}>
          .
        </button>
        <button
          className="calculator-cell cell-operator"
          onClick={handleEqualsClick}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
