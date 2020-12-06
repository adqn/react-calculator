import React from 'react';

const operationList = [
  '+',
  '-',
  '*',
  '/',
  '=',
  'C'
]

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

export default Operations;