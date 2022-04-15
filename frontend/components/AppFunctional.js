import React, { useState, useEffect } from 'react'


export default function AppFunctional(props) {
  
  const [coordinates, setCoordinates] = useState([2,2]);
  const [message, setMessage] = useState('');


  const handleDirection = (dir) => {
    if(dir === 'up'){
      if(coordinates[1] > 1){
      setCoordinates([
        coordinates[0], 
        coordinates[1]-1
      ])
    }else{
      setCoordinates([
        ...coordinates
      ])
      setMessage(`You can't go up!`)
    }
  }
    if(dir === 'down'){
      if(coordinates[1] < 3){
      setCoordinates([
        coordinates[0], 
        coordinates[1]+1
      ])
    }else{
      setCoordinates([
        ...coordinates
      ])
      setMessage(`You can't go down!`)
    }
  }
    if(dir === 'left'){
      if(coordinates[0] > 1){
        console.log(coordinates)
      setCoordinates([
        coordinates[0]-1, 
        coordinates[1]
      ])
    }else{
      setCoordinates([
        ...coordinates
      ])
      setMessage(`You can't go left!`)

    }
  }
  if(dir === 'right'){
    if(coordinates[0] < 3){
    setCoordinates([
      coordinates[0]+1, 
      coordinates[1]
    ])
  }else{
    setCoordinates([
      ...coordinates
    ])
    setMessage(`You can't go right!`)
  }
}
    return coordinates;
}


const handleReset = () => {
  setCoordinates([2,2]);
  setMessage('');
}




  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${coordinates})`}</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        <div className='square'></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className='square active'>B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => handleDirection('left')}>LEFT</button>
        <button id="up" onClick={()=>handleDirection('up')}>UP</button>
        <button id="right" onClick={()=>handleDirection('right')}>RIGHT</button>
        <button id="down" onClick={()=>handleDirection('down')}>DOWN</button>
        <button id="reset" onClick={handleReset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
