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
    else {}
  }

  function add(e) { 
    e.preventDefault();
    inputRef.current.value = '';
    setOperator("add");
  }; 
 
  function minus(e) { 
  	e.preventDefault(); 
    inputRef.current.value = '';
    setOperator("minus");
  };
 
  function times(e) { 
    e.preventDefault(); 
    inputRef.current.value = '';
    setOperator("times");
  }; 
 
  function divide(e) { 
    e.preventDefault(); 
    inputRef.current.value = '';
    setOperator("divide");  };

  function equals(e) {
    e.preventDefault();
    console.log(operator, result);
    if (operator === "add") {
      const value = Number(inputRef.current.value)
      setResult((result) => result + value);
      inputRef.current.value = '';
      setOperator(null);
    };

    if (operator === "minus") {
      const value = Number(inputRef.current.value)
      setResult((result) => result - value);
      inputRef.current.value = '';
      setOperator(null);
    };

    if (operator === "times") {
      const value = Number(inputRef.current.value)
      setResult((result) => result * value);
      inputRef.current.value = '';
      setOperator(null);
    };

    if (operator === "divide") {
      const value = Number(inputRef.current.value)
      setResult((result) => result / value);
      inputRef.current.value = '';
      setOperator(null);
    };
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
        <button onClick={add}>add</button> 
        <button onClick={minus}>minus</button> 
        <button onClick={times}>times</button> 
        <button onClick={divide}>divide</button> 
        <button onClick={equals}>equal</button>
        <button onClick={resetInput}>reset input</button> 
        <button onClick={resetResult}>reset result</button> 
      </form> 
    </div> 
  ); 
}

export default App
