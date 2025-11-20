import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const inputRef = useRef(null); 
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);
  const [firstNumber, setFirstNumber] = useState(null);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {

    const raw = e.target.value;
    const trimmed= raw.slice(0,1); //keep only one digit;
    setInputValue(trimmed);

    const value = trimmed === '' ? 0 : Number(trimmed);
    
    if (operator === null) {
      setResult(value);
      setFirstNumber(value);
    } else if (firstNumber){
      // setFirstNumber(result);
      setResult(value);
      setNextNumber(value);
    } 
  }

  function handleDigitClick (e) {
    const value = Number(e);
    setInputValue(String(value)); //show it in the input bar too

    if (operator === null) {
      setResult(value);
      setFirstNumber(value);
    } else if (firstNumber){
      // setFirstNumber(result);
      setResult(value);
      setNextNumber(value);
    } 
  }

  function chooseOperator (e, op) {
    /*e.preventDefault();  By default, a button inside a form has a 
                           type of ‘submit’. We originally added 
                           preventDefault() so the page wouldn’t reload 
                           and reset the component’s state. Changing the button 
                           type to "button" removes the submit behavior, which 
                           prevents the page from reloading. It does NOT cause 
                           a reload. It stops one. */
    inputRef.current.value = '';
    setOperator(op);
  }

  const Operators = {
    add: (a,b) => a + b,
    minus: (a,b) => a - b,
    times: (a,b) => a * b,
    divide: (a,b) => a / b
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
    setInputValue("");          // optional: clear input text
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function resetInput(e) { 
    e.preventDefault();
    inputRef.current.value = '';
  }; 
 
  function resetResult(e) { 
  	e.preventDefault();
    setResult(0);
    setNextNumber(0);
    setFirstNumber(0);
    setInputValue("");
  }; 

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
                {result}
              </output>
            </div>

            {/* Input */}
            <div className="display-row display-input-row">
              <input
                id="number-input"
                pattern="[0-9]"
                ref={inputRef}
                type="number"
                placeholder="type or click a number"
                value={inputValue}
                onChange={handleInputChange}
                className="display-input"
              />
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

            {/* Row 4 (reset / zero / reset / divide) */}
            <button type="button" className="key key-reset-input" 
              onClick={resetInput}>
              RI
            </button>
            <button type="button" className="key key-zero"
              onClick={(e) => handleDigitClick(0)}>0</button>
            <button type="button" className="key key-reset-result" 
              onClick={resetResult}>
              RR
            </button>
            <button type="button" className="op op-divide"
              onClick={(e) => chooseOperator(e,"divide")}>÷</button>

            {/* Row 5 (equals) */}
            <button type="button" className="op op-equals" 
              onClick={equals}>
              Equals
            </button>
          </section>
        </section>
      </main>
    </div> 
  )
}

export default App
