import React, {useState, useEffect, useReducer} from 'react';
import { calculateFromAtoms } from './components/calcHelpers';
import './App.css';

const operationList = [
  '+',
  '-',
  '*',
  '/',
  '=',
  'C'
]

const numberList = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// To be called on 'enter' or '=' sign press
const answerReducer = (state, action) => {
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

const Operations = ({handleRegisterSwitch}) => {
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

const App = () => {
  const [display, setDisplay] = useState(null);
  const [answer, setAnswer] = useReducer(answerReducer, 0);
  const [currentRegister, setCurrentRegister] = useState(null);
  const [tempRegister, setTempRegister] = useState(null);
  const [operationRegister, setOperationRegister] = useState(null);
  const [registerSwitch, setRegisterSwitch] = useState(false);

  const handleOperation = (operation) => {
    setAnswer({
      type: operation,
      payload: {currentRegister: currentRegister, tempRegister: tempRegister}
    });
  }

  const handleRegisterSwitch = (operation) => {
    if (operation === '=') {
      handleOperation(operationRegister);
      setCurrentRegister(answer);
      setDisplay(answer);
      clearRegisters('all');
    } 

    if (operation === 'all') {
      clearRegisters();
      setRegisterSwitch(false);
      setDisplay("");
    }

    else {
      setOperationRegister(operation);
      setRegisterSwitch(!registerSwitch);
    }
  }


  const clearRegisters = flag => {
    setTempRegister(null);
    setOperationRegister(null);

    if (flag === 'all') {
      setCurrentRegister(null);
    }
  }

  const getUpdatedDisplay = (symbol, register) => {
    let updatedDisplay;
    register ? 
      updatedDisplay =  register.toString() + symbol.toString() :
      updatedDisplay = symbol.toString();
    return updatedDisplay;
  }

  const getUpdatedRegister = (symbol, register) => {
    let updatedRegister;
    register ?
      updatedRegister =  Number(register.toString() + symbol.toString()) :
      updatedRegister =  Number(symbol.toString())
    return updatedRegister;
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