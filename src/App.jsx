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

  /* Handles digit input: sets firstNumber or nextNumber and 
  updates the printScreen display */
  function handleDigitClick (digit) {
    const value = digit;

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
        } else {
          return `${trimmed} ${value}`;
        }
      })
    }
  }

  // Operators
  const Operators = {
    add: (a,b) => a + b,
    minus: (a,b) => a - b,
    times: (a,b) => a * b,
    divide: (a,b) => a / b
  }

    const Op_Symbols = { // Be careful: how you declare these operators affects the regex.
    add: "+",
    minus: "−",
    times: "×",
    divide: "/",
  };

  /* Handles operator input: sets the operator and updates printScreen 
  by replacing or appending the symbol */
  function chooseOperator (op) {
    // No first number yet? Ignore operator.
    if (firstNumber === null) return;

    //  We already have firstNumber, operator, AND nextNumber → ignore extra operators
    if (nextNumber !== null) {
      return; // do nothing: force only 2 numbers + 1 operator
    }

    const symbol = Op_Symbols[op] || op;
    setOperator(op);
    setPrintScreen(prev => {
      const trimmed = prev.trim(); //trim() removes empty spaces at the start/ending
      if (!trimmed) return "";
      
      const lastChar = trimmed[trimmed.length - 1];
      const isOperatorChar = ["+", "−", "×", "/"].includes(lastChar);
      
      // If the display already ends with an operator, REPLACE it
      if (isOperatorChar && nextNumber == null) {
        return trimmed.slice(0, -1) + symbol; /* slice extracts part of a string. 
                                                 start = 0 > beginning
                                                 end = -1 > stop one character before end */
      } else {
        // Otherwise, append operator after first number
        return `${trimmed} ${symbol}`;
      }
    });
  }

  // Executes the selected operation, updates the result, and prepares state for chaining
  function equals() {
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
  
  // Fully reset all calculator values (numbers, operator, display)
  function resetResult() { 
    setResult(0);
    setNextNumber(null);
    setFirstNumber(null);
    setOperator(null);
    setPrintScreen("");
  }; 

  // Add keyboard controls: digits, operators, equals (Enter), and reset (Esc)
  /* useEffect runs after React has painted the UI to the screen. You use it for “side effects” 
  — things outside of pure rendering, like:
    talking to window or document
    timers (setTimeout, setInterval)
    network requests event listeners (like you’re doing here)
  So you can think of this as: "Once the component has rendered, set up some keyboard controls.” */
  useEffect(() => {
    const KEY_TO_OPERATOR = { // used to avoid deeply nested or repetitive if statements for operators
      "+": "add",
      "-": "minus",
      "x": "times",
      "/": "divide",
    };

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
        equals();
        return;
      }

      // ----- RESET (Esc) -----
      if (key === "Escape") {
        event.preventDefault();
        resetResult();
        return;
      }

      // ----- OPERATORS -----
      const op = KEY_TO_OPERATOR[key]; /* key is the string produced by the keypress (Shift + "=" → "+").
                                          You avoid deeply nested or repetitive if statements.
                                          Rely on the browser's built-in key normalizaion
                                          You et auto Shift-handling for free */

      if (op) {
        event.preventDefault();
        chooseOperator(op);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    // Clean up on re-render/unmount so we don't stack listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };  
  }, [firstNumber, nextNumber, operator]); /* Array holds your dependencies. You only include dependencies 
                                              that the effect actually uses inside its logic. All other 
                                              state/function updates will indirectly trigger re-renders 
                                              anyway, but they don’t require the effect to re-run. */

  return ( 
    <div className="App">
      <main className="calculatorShell" aria-labelledby="calc-title">
        <header className="calculator-header">
          <h2 id="calc-title" className="calc-title">SIMPLEST CALCULATOR</h2>
        </header>

        <section className="calculator" aria-label="Calculator interface">
          <section className="display" aria-label="Calculator display">
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
              onClick={(e) => chooseOperator("add")}>+</button>

            {/* Row 2 */}
            <button type="button" className="key key-four"
              onClick={(e) => handleDigitClick(4)}>4</button>
            <button type="button" className="key key-five"
              onClick={(e) => handleDigitClick(5)}>5</button>
            <button type="button" className="key key-six"
              onClick={(e) => handleDigitClick(6)}>6</button>
            <button type="button" className="op op-minus"
              onClick={(e) => chooseOperator("minus")}>−</button>

            {/* Row 3 */}
            <button type="button" className="key key-one"
              onClick={(e) => handleDigitClick(1)}>1</button>
            <button type="button" className="key key-two"
              onClick={(e) => handleDigitClick(2)}>2</button>
            <button type="button" className="key key-three"
              onClick={(e) => handleDigitClick(3)}>3</button>
            <button type="button" className="op op-times"
              onClick={(e) => chooseOperator("times")}>×</button>

            {/* Row 4 (reset / zero / equal) */}
            <button type="button" className="key key-reset-result" 
              onClick={resetResult}>
              R
            </button>
            <button type="button" className="key key-zero"
              onClick={(e) => handleDigitClick(0)}>0</button>
            <button type="button" className="key key-equals" 
              onClick={equals}>
              =
            </button>
            <button type="button" className="op op-divide"
              onClick={(e) => chooseOperator("divide")}>/</button>
          </section>
        </section>
      </main>

      <p className="l-w">
        Listen with:<br />
        Adieu Aru & A.L.I.S.O.N - Discorde
      </p>
    </div> 
  )
}

export default App
