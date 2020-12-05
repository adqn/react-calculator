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
    case '+':
      return (
        // This should work
        action.payload.currentRegister + action.payload.tempRegister
      );
    case '-':
      return (
        action.payload.currentRegister - action.payload.tempRegister
      )
  }
}

function Display({display}) {
  return (
    <div className="Display">
      {display}
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

const Operations = ({handleOperation, handleRegisterSwitch}) => {
  return (
    <div className="Operations">      
      {
        operationList.map(operation => 
            <div className="Button" onClick={() => handleRegisterSwitch(operation)}>
              {operation}
            </div>
      )}
    </div>
  )
}

function App() {
  const [display, setDisplay] = useState(0);
  // const [currentRegister, setCurrentRegister] = useReducer(registerReducer, 0);
  const [currentRegister, setCurrentRegister] = useState(0);
  const [tempRegister, setTempRegister] = useState(0);
  const [operationRegister, setOperationRegister] = useState(null);
  const [registerSwitch, setRegisterSwitch] = useState(false);

  // const handleOperation = (operation) => {
  //   setCurrentRegister({
  //     type: operation,
  //     payload: {currentRegister: currentRegister, tempRegister: tempRegister}
  //   });
  // }

  const handleRegisterSwitch = (operation) => {
    setRegisterSwitch(!registerSwitch);
    // handleOperation(operation);
  }

  const getOperation = operation => {
    setOperationRegister(operation);
  }

  const getUpdatedDisplay = (symbol, register) => {
    return register.toString() + symbol.toString();
  }

  const getUpdatedRegister = (symbol, register) => {
    return Number(register.toString() + symbol.toString());
  }

  const setDisplayAndRegister = (symbol) => {
    let display;
    let register;

    if (registerSwitch === false) {
      display = getUpdatedDisplay(symbol, currentRegister);
      register = getUpdatedRegister(symbol, currentRegister);
      setCurrentRegister(register)
    } else {
      display = getUpdatedDisplay(symbol, tempRegister);
      register = getUpdatedRegister(symbol, tempRegister);
      setTempRegister(register)
    }

    setDisplay(display)
  }

  const handleInput = symbol => {
    setDisplayAndRegister(symbol)
  }

  return (
    <div className="Calculator">
      <Display display={display} />
      <div className="Keypad">
        <Numbers handleInput={handleInput}/>
        <Operations 
                    handleRegisterSwitch={handleRegisterSwitch}  
                    />
      </div>
    </div>
  );
}

export default App;