import React, {useState, useEffect, useReducer} from 'react';
import './App.css';

const Button = (symbol) => {
  return (
    <div className="Button">
      <b>{symbol}</b>
    </div>
  )
}

const registerReducer = (state, action) => {
  switch(action.type) {
    case 'ADD':
      return (
        // This should work
        action.payload.currentRegister + action.payload.tempRegister 
      );
    case 'SUBTRACT':
      return (
        action.payload.currentRegister - action.payload.tempRegister
      )
  }
} 

function Display({currentRegister}) {
  return (
    <div className="Display">
      {currentRegister}
    </div>
  )
}

function Keypad() {
  return (
    <div className="Keypad">
      <Numbers />
      <Operations />
    </div>
  );
}

function Numbers() {
  return (
    <div className="Numbers">
      {
        Array.from(Array(10), (e, i) => {
          return Button(i)
        })
      }
    </div>
  )
}

function Operations() {
  return (
    <div className="Operations">

    </div>
  )
}

function App() {
  const [currentRegister, setCurrentRegister] = useReducer(registerReducer, 0);
  const [tempRegister, setTempRegister] = useState(0);

  const handleOperation = (operation) => {
    setCurrentRegister({
      type: operation,
      payload: {currentRegister: currentRegister, tempRegister: tempRegister}
    });
  }

  return (
    <div className="Calculator">
      <Display currentRegister={currentRegister} />
      <Keypad />
    </div>
  );
}

export default App;