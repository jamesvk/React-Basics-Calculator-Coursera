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
 
  return ( 
    <div className="App"> 
      <div> 
        <h1>Simplest Working Calculator</h1> 
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
  ); 
}

export default App
