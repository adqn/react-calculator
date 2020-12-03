import React, {useState, useEffect, useReducer} from 'react';
import './App.css';

const operationList = [
  '+',
  '-',
  '*',
  '/'
]

const numberList = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const Button = ({symbol}) => {
  return (
    <div> 
      <b>{symbol}</b>
    </div>
  )
}

// To be called on 'enter' or '=' sign press
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
        numberList.map(number => 
          <div className="Button">
            <Button symbol={number} />
          </div>
        )
      }
    </div>
  )
}

function Operations() {
  return (
    <div className="Operations">      
      {
        operationList.map(operation => 
          <div className="Button">
            <Button symbol={operation} />
          </div>
          )
      }
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

  const handleInput = event => {
    setCurrentRegister(event.target.value);
  }

  return (
    <div className="Calculator">
      <Display currentRegister={currentRegister} />
      <Keypad />
    </div>
  );
}

export default App;