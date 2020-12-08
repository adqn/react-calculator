import React, {useState, useEffect, useReducer} from 'react';
import { calculateFromAtoms } from './components/calcHelpers';
import Operations from './components/Operations';
import Numbers from './components/Numbers';
import Display from './components/Display';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState(null);
  const [currentRegister, setCurrentRegister] = useState(null);
  const [tempRegister, setTempRegister] = useState(null);
  const [thirdRegister, setThirdRegister] = useState(null);
  const [operationRegister, setOperationRegister] = useState(null);
  const [registerSwitch, setRegisterSwitch] = useState(false);

  // factor out register states and move this to calcHelpers (?)
  const composeAtom = () => {
    let newAtom;

    if (tempRegister) {
      newAtom = [operationRegister, currentRegister, tempRegister];
      return newAtom;
    }
  }

  const handleRegisterSwitch = (operation) => {
    if (operation === '=') {
      if (currentRegister) {
        const newAtom = composeAtom();
        console.log(newAtom);
        const answer = calculateFromAtoms(newAtom);
        setCurrentRegister(answer);
        setDisplay(answer);
        clearRegisters('some');
        setRegisterSwitch(false);
      }
    } 

    if (operation === 'C') {
      clearRegisters('all');
      setDisplay(null);
    }

    else {
      setOperationRegister(operation);
    }

    setRegisterSwitch(!registerSwitch);
  }

  const clearRegisters = flag => {
    setTempRegister(null);
    setOperationRegister(null);
    setRegisterSwitch(false);

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
    if (register) {
      updatedRegister =  Number(register.toString() + symbol.toString());
    } else {
      updatedRegister =  Number(symbol.toString()); 
    }

    return updatedRegister;
  }

  const setDisplayAndRegisters = (symbol) => {
    let display;
    let register;

    if (registerSwitch === false) {
      display = getUpdatedDisplay(symbol, currentRegister);
      register = getUpdatedRegister(symbol, currentRegister);
      
      if (currentRegister) {
        // ?????
      } else {
        setCurrentRegister(register);
      }

    } else {
      display = getUpdatedDisplay(symbol, tempRegister);
      register = getUpdatedRegister(symbol, tempRegister);
      setTempRegister(register)
    }

    setDisplay(display)
  }

  const handleInput = symbol => {
    setDisplayAndRegisters(symbol)
  }

  return (
    <div className="Calculator">
      <Display display={display} />
      <div className="Keypad">
        <Numbers handleInput={handleInput}/>
        <Operations handleRegisterSwitch={handleRegisterSwitch} />
      </div>
    </div>
  );
}

export default App;