import React, {useState, useEffect, useReducer} from 'react';
import './App.css';

const operationList = [
  '+',
  '-',
  '*',
  '/'
]

const numberList = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

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

function Numbers({handleInput}) {
  return (
    <div className="Numbers">
      {
        numberList.map(number => 
          <div className="Button" onClick={() => handleInput(number)}>
            {number}
          </div>
        )
      }
    </div>
  )
}

const Operations = ({handleOperation}) => {
  return (
    <div className="Operations">      
      {
        operationList.map(operation => 
          <div className="Button" onClick={() => handleOperation(operation)}>
            {operation}
          </div>
          )
      }
    </div>
  )
}

function App() {
  const [display, setDisplay] = useState(0);
  // const [currentRegister, setCurrentRegister] = useReducer(registerReducer, 0);
  const [currentRegister, setCurrentRegister] = useState(0);
  const [tempRegister, setTempRegister] = useState(0);
  const [operationRegister, setOperationRegister] = useState(null);

  const handleOperation = (operation) => {
    setCurrentRegister({
      type: operation,
      payload: {currentRegister: currentRegister, tempRegister: tempRegister}
    });
  }

  const getOperation = operation => {
    setOperationRegister(operation);
  }

  const handleInput = symbol => {
    const updatedDisplay = currentRegister.toString() + symbol.toString()
    const updatedRegister = Number(currentRegister.toString() + symbol.toString())
    setDisplay(updatedDisplay);
    setCurrentRegister(updatedRegister);
  }

  return (
    <div className="Calculator">
      <Display currentRegister={currentRegister} />
      <div className="Keypad">
        <Numbers handleInput={handleInput}/>
        <Operations handleOperation={handleOperation} />
      </div>
    </div>
  );
}

export default App;