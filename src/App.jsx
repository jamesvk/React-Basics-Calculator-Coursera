import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const inputRef = useRef(null); 
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState(null);

  function handleInputChange(e) {
    const value = Number(e.target.value);
    if (operator === null) setResult(value);
  }

  function chooseOperator (e, op) {
    /* e.preventDefault(); By default, a button inside a form has a 
                           type of ‘submit’. We originally added 
                           preventDefault() so the page wouldn’t reload 
                           and reset the component’s state. Changing the button 
                           type to "button" removes the submit behavior, which 
                           prevents the page from reloading. It does NOT cause 
                           a reload. It stops one.*/
                          
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

    const value = Number(inputRef.current.value);
    const operation = Operators[operator];

    if (!operation) return;
    setResult(result => operation(result, value));
    inputRef.current.value = '';
    setOperator(null);
  }

  function resetInput(e) { 
    e.preventDefault();
    inputRef.current.value = '';
  }; 
 
  function resetResult(e) { 
  	e.preventDefault();
    setResult(0);
  }; 
 
  /* return ( 
    <div className="App"> 
      <div> 
        <h1>Simplest Calculator</h1> 
      </div> 
      <form> 
        <p> 
          {result} 
        </p> 
        <input
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
          onChange={handleInputChange}
        /> 
        <button type="button" onClick={(e) => chooseOperator(e,"add")}>add</button> 
        <button type="button" onClick={(e) => chooseOperator(e,"minus")}>minus</button> 
        <button type="button" onClick={(e) => chooseOperator(e,"times")}>times</button> 
        <button type="button" onClick={(e) => chooseOperator(e,"divide")}>divide</button> 
        <button type="button" onClick={equals}>equal</button>
        <button type="button" onClick={resetInput}>reset input</button> 
        <button type="button" onClick={resetResult}>reset result</button> 
      </form> 
    </div> 
  ); */
  return ( 
    <div className="App">
      <div className="equalsShell">

      </div>
      
      <main className="calculatorShell" aria-labelledby="calc-title">
        <header className="calculator-header">
          <h1 id="calc-title" className="calc-title">Simplest Calculator</h1>
        </header>

        <section className="calculator" aria-label="Calculator interface">
          {/* Display / result + input */}
          <section className="display" aria-label="Calculator display">
            {/* Result */}
            <div className="display-row">
              <output className="display-result" aria-live="polite" aria-label="Current result">
                {result}
              </output>
            </div>

            {/* Input */}
            <div className="display-row">
              <input
                id="number-input"
                pattern="[0-9]"
                ref={inputRef}
                type="number"
                placeholder="Type a number"
                onChange={handleInputChange}
                className="display-input"
              />
            </div>
          </section>

          {/* Keypad: numbers, resets, operators */}
          <section className="keypad" aria-label="Numeric keypad">
            {/* Row 1 */}
            <button type="button" className="key key-seven">7</button>
            <button type="button" className="key key-eight">8</button>
            <button type="button" className="key key-nine">9</button>
            <button type="button" className="op op-add">+</button>

            {/* Row 2 */}
            <button type="button" className="key key-four">4</button>
            <button type="button" className="key key-five">5</button>
            <button type="button" className="key key-six">6</button>
            <button type="button" className="op op-minus">−</button>

            {/* Row 3 */}
            <button type="button" className="key key-one">1</button>
            <button type="button" className="key key-two">2</button>
            <button type="button" className="key key-three">3</button>
            <button type="button" className="op op-times">×</button>

            {/* Row 4 (reset / zero / reset / divide) */}
            <button type="button" className="key key-reset-input" onClick={resetInput}>
              RI
            </button>
            <button type="button" className="key key-zero">0</button>
            <button type="button" className="key key-reset-result" onClick={resetResult}>
              RR
            </button>
            <button type="button" className="op op-divide">÷</button>

            {/* Row 5 (equals) */}
            <button type="button" className="op op-equals" onClick={resetInput}>
              Equals
            </button>
          </section>
        </section>
      </main>
    </div> 
  )
}

export default App
