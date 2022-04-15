import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = ' http://localhost:9000/api/result';

export default function AppFunctional(props) {
  const initialGrid = [[''], [''], [''], [''], ['B'], [''], [''], [''], ['']];

  const [coordinates, setCoordinates] = useState([2, 2]);
  const [message, setMessage] = useState('');
  const [totalMoves, setTotalMoves] = useState(0);
  const [grid, setGrid] = useState(initialGrid);
  const [email, setEmail] = useState('');

  const handleDirection = (dir) => {
    if (dir === 'up') {
      if (coordinates[1] > 1) {
        setCoordinates([coordinates[0], coordinates[1] - 1]);
        setTotalMoves(totalMoves + 1);
        setMessage('');
      } else {
        setCoordinates([...coordinates]);
        setMessage(`You can't go up`);
      }
    }
    if (dir === 'down') {
      if (coordinates[1] < 3) {
        setCoordinates([coordinates[0], coordinates[1] + 1]);
        setTotalMoves(totalMoves + 1);
        setMessage('');
      } else {
        setCoordinates([...coordinates]);
        setMessage(`You can't go down`);
      }
    }
    if (dir === 'left') {
      if (coordinates[0] > 1) {
        setCoordinates([coordinates[0] - 1, coordinates[1]]);
        setTotalMoves(totalMoves + 1);
        setMessage('');
      } else {
        setCoordinates([...coordinates]);
        setMessage(`You can't go left`);
      }
    }
    if (dir === 'right') {
      if (coordinates[0] < 3) {
        setCoordinates([coordinates[0] + 1, coordinates[1]]);
        setTotalMoves(totalMoves + 1);
        setMessage('');
      } else {
        setCoordinates([...coordinates]);
        setMessage(`You can't go right`);
      }
    }
    return coordinates;
  };

  const handleReset = () => {
    setCoordinates([2, 2]);
    setMessage('');
    setTotalMoves(0);
    setEmail('');
  };
  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const submission = {
      x: coordinates[0],
      y: coordinates[1],
      steps: totalMoves,
      email: email,
    };
    axios
      .post(url, submission)
      .then((res) => {
        setMessage(res.data.message);
        setEmail('');
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const handleMove = () => {
    if (coordinates[0] === 1 && coordinates[1] === 1) {
      setGrid([['B'], [''], [''], [''], [''], [''], [''], [''], ['']]);
    }
    if (coordinates[0] === 2 && coordinates[1] === 1) {
      setGrid([[''], ['B'], [''], [''], [''], [''], [''], [''], ['']]);
    }
    if (coordinates[0] === 3 && coordinates[1] === 1) {
      setGrid([[''], [''], ['B'], [''], [''], [''], [''], [''], ['']]);
    }
    if (coordinates[0] === 1 && coordinates[1] === 2) {
      setGrid([[''], [''], [''], ['B'], [''], [''], [''], [''], ['']]);
    }
    if (coordinates[0] === 2 && coordinates[1] === 2) {
      setGrid([[''], [''], [''], [''], ['B'], [''], [''], [''], ['']]);
    }
    if (coordinates[0] === 3 && coordinates[1] === 2) {
      setGrid([[''], [''], [''], [''], [''], ['B'], [''], [''], ['']]);
    }
    if (coordinates[0] === 1 && coordinates[1] === 3) {
      setGrid([[''], [''], [''], [''], [''], [''], ['B'], [''], ['']]);
    }
    if (coordinates[0] === 2 && coordinates[1] === 3) {
      setGrid([[''], [''], [''], [''], [''], [''], [''], ['B'], ['']]);
    }
    if (coordinates[0] === 3 && coordinates[1] === 3) {
      setGrid([[''], [''], [''], [''], [''], [''], [''], [''], ['B']]);
    }
    return grid;
  };
  const getActiveSquare = (square) => {
    if (square == 'B') {
      return 'square active';
    } else {
      return 'square';
    }
  };

  useEffect(() => {
    handleMove();
  }, [coordinates]);

  return (
    <div id='wrapper' className={props.className}>
      <div className='info'>
        <h3 id='coordinates'>Coordinates {`(${coordinates})`}</h3>
        <h3 id='steps'>
          You moved {totalMoves} {totalMoves === 1 ? `time` : `times`}
        </h3>
      </div>
      <div id='grid'>
        {grid.map((square, idx) => {
          return (
            <div className={getActiveSquare(square)} key={idx}>
              {square}
            </div>
          );
        })}
      </div>
      <div className='info'>
        <h3 id='message'>{message}</h3>
      </div>
      <div id='keypad'>
        <button id='left' onClick={() => handleDirection('left')}>
          LEFT
        </button>
        <button id='up' onClick={() => handleDirection('up')}>
          UP
        </button>
        <button id='right' onClick={() => handleDirection('right')}>
          RIGHT
        </button>
        <button id='down' onClick={() => handleDirection('down')}>
          DOWN
        </button>
        <button id='reset' onClick={handleReset}>
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id='email'
          type='email'
          placeholder='type email'
          onChange={handleChange}
          value={email}
        ></input>
        <input id='submit' type='submit'></input>
      </form>
    </div>
  );
}
