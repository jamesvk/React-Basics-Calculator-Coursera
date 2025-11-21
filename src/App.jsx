import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(0);
  const [printScreen, setPrintScreen] = useState("");

  function handleDigitClick (e) {
    const value = Number(e);

    if (operator === null) {
      setFirstNumber(value);
      setResult(value);
      setPrintScreen(String(value));
      return;
    }

    if (firstNumber !== null) {
      setNextNumber(value);
      setResult(value);
      setPrintScreen(prev => {
        const trimmed = prev.trim();
        if (/[0-9]$/.test(trimmed)) {
          return trimmed.slice(0, -1) + String(value);
        }

        return `${trimmed} ${value}`;
      })
    }
  }


  const Operators = {
    add: (a,b) => a + b,
    minus: (a,b) => a - b,
    times: (a,b) => a * b,
    divide: (a,b) => a / b
  }

    const Op_Symbols = {
    add: "+",
    minus: "−",
    times: "×",
    divide: "/",
  };

  function chooseOperator (e, op) {
    const symbol = Op_Symbols[op] || op;
    setOperator(op);
    setPrintScreen(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return "";
      
      const lastChar = trimmed[trimmed.length - 1];
      const isOperatorChar = ["+", "−", "×", "/"].includes(lastChar);
      
      // If the display already ends with an operator, REPLACE it
      if (isOperatorChar && nextNumber == null) {
        return trimmed.slice(0, -1) + symbol;
      }

    // Otherwise, append operator after first number
      return `${trimmed} ${symbol}`;
    });
  }

  function equals(e) {
    e.preventDefault();
    if (!operator) return;
    
    const operation = Operators[operator];
    if (!operation) return; 

    if (firstNumber == null || nextNumber == null) return;

    const newResult= operation(firstNumber, nextNumber);

    setResult(newResult);
    setFirstNumber(newResult);  // carry result forward for chaining
    setNextNumber(null);        // clear second number
    setOperator(null);          // ready for a new operator
    setPrintScreen(String(newResult));
  }

 
  function resetResult(e) { 
  	e.preventDefault();
    setResult(0);
    setNextNumber(0);
    setFirstNumber(0);
    setOperator(null);
    setPrintScreen("");
  }; 

  // Keyboard buttons
  useEffect(() => {
    function handleKeyDown(event) {
      const {key, shiftKey} = event;

      // If the user presses a digit key 0–9, treat it like a button click
      if (key >= "0" && key <= "9") {
        event.preventDefault();
        handleDigitClick(Number(key));
      }

      // ----- EQUALS (Enter or "=") -----
      if (key === "Enter" || key === "=") {
        event.preventDefault();
        equals(event);
        return;
      }

      // ----- RESET (Esc) -----
      if (key === "Escape") {
        event.preventDefault();
        resetResult(event);
        return;
      }

      // ----- OPERATORS -----

      // "+" → must press Shift + "=" on keyboard
      if (shiftKey && key === "+") {
        event.preventDefault();
        chooseOperator(event, "add");
        return;
      }

      // "-" key (no need for shift on most keyboards)
      if (key === "-") {
        event.preventDefault();
        chooseOperator(event, "minus");
        return;
      }

      // "x" -> times
      if (key === "x") {
        event.preventDefault();
        chooseOperator(event, "times");
        return;
      }

      // "/" → divide
      if (key === "/") {
        event.preventDefault();
        chooseOperator(event, "divide");
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    // Clean up on re-render/unmount so we don't stack listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };  
  }, [firstNumber, nextNumber, operator]);


  return ( 
    <div className="App">
      <main className="calculatorShell" aria-labelledby="calc-title">
        <header className="calculator-header">
          <h2 id="calc-title" className="calc-title">SIMPLEST CALCULATOR</h2>
        </header>

        <section className="calculator" aria-label="Calculator interface">
          {/* Display / result + input */}
          <section className="display" aria-label="Calculator display">
            {/* Result */}
            <div className="display-row display-result-row">
              <output className="display-result" aria-live="polite" aria-label="Current result">
                {printScreen || result}
              </output>
            </div>
          </section>

          {/* Keypad: numbers, resets, operators */}
          <section className="keypad" aria-label="Numeric keypad">
            {/* Row 1 */}
            <button type="button" className="key key-seven"
              onClick={(e) => handleDigitClick(7)}>7</button>
            <button type="button" className="key key-eight"
              onClick={(e) => handleDigitClick(8)}>8</button>
            <button type="button" className="key key-nine"
              onClick={(e) => handleDigitClick(9)}>9</button>
            <button type="button" className="op op-add" 
              onClick={(e) => chooseOperator(e,"add")}>+</button>

            {/* Row 2 */}
            <button type="button" className="key key-four"
              onClick={(e) => handleDigitClick(4)}>4</button>
            <button type="button" className="key key-five"
              onClick={(e) => handleDigitClick(5)}>5</button>
            <button type="button" className="key key-six"
              onClick={(e) => handleDigitClick(6)}>6</button>
            <button type="button" className="op op-minus"
              onClick={(e) => chooseOperator(e,"minus")}>−</button>

            {/* Row 3 */}
            <button type="button" className="key key-one"
              onClick={(e) => handleDigitClick(1)}>1</button>
            <button type="button" className="key key-two"
              onClick={(e) => handleDigitClick(2)}>2</button>
            <button type="button" className="key key-three"
              onClick={(e) => handleDigitClick(3)}>3</button>
            <button type="button" className="op op-times"
              onClick={(e) => chooseOperator(e,"times")}>×</button>

            {/* Row 4 (reset / zero / equal) */}
            <button type="button" className="key key-reset-result" 
              onClick={resetResult}>
              R
            </button>
            <button type="button" className="key key-zero"
              onClick={(e) => handleDigitClick(0)}>0</button>
            <button type="button" className="key key-equals" 
              onClick={equals}>
              E
            </button>
            <button type="button" className="op op-divide"
              onClick={(e) => chooseOperator(e,"divide")}>/</button>
          </section>
        </section>
      </main>
    </div> 
  )
}

export default App
