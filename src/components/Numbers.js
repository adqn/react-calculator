import React from 'react';

const numberList = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]

const Numbers = ({handleInput}) => {
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

export default Numbers;