import React from 'react';
import axios from 'axios';

const url = ' http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  
  initialState = {
    coordinates: [2, 2],
    totalMoves: 0,
    message: '',
    grid: [
      [''],
      [''],
      [''],
      [''],
      ['B'],
      [''],
      [''],
      [''],
      [''],
    ],
    email: '',
  }

  state = this.initialState;

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const submission = {
       "x": this.state.coordinates[0], 
       "y": this.state.coordinates[1], 
       "steps": this.state.totalMoves, 
       "email": this.state.email
    }

    axios.post(url, submission)
      .then(res => {
        this.setState({
          ...this.state,
          message: res.data.message,
          email: '',
        })
      })
        .catch(err => {
          this.setState({
            ...this.state,
            message: err.response.data.message
          })
        })
        return this.state
  }
    

  handleDirection = (dir) => {
    const { coordinates } = this.state;
    if (dir === 'up') {
      if (coordinates[1] > 1) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0], coordinates[1] - 1],
          totalMoves: this.state.totalMoves+1,
          message: ''
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go up`,
        });
      }

    }
    if (dir === 'down') {
      if (coordinates[1] < 3) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0], coordinates[1] + 1],
          totalMoves: this.state.totalMoves+1,
          message: ''
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go down`,
        });
      }

    }
    if (dir === 'left') {
      if (coordinates[0] > 1) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0] - 1, coordinates[1]],
          totalMoves: this.state.totalMoves+1,
          message: ''
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go left`,
        });
      }

    }
    if (dir === 'right') {
      if (coordinates[0] < 3) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0] + 1, coordinates[1]],
          totalMoves: this.state.totalMoves+1,
          message: ''
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go right`,
        });
      }
    }
    return coordinates
  };

  
  handleMove = () => {
    const {coordinates} = this.state
    if(coordinates[0] === 1 && coordinates[1] === 1){
      this.setState({
        ...this.state,
        grid: [
          ['B'],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 2 && coordinates[1] === 1){
      this.setState({
        ...this.state,
        grid: [
          [''],
          ['B'],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 3 && coordinates[1] === 1){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          ['B'],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 1 && coordinates[1] === 2){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          ['B'],
          [''],
          [''],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 2 && coordinates[1] === 2){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          [''],
          ['B'],
          [''],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 3 && coordinates[1] === 2){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          [''],
          [''],
          ['B'],
          [''],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 1 && coordinates[1] === 3){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          ['B'],
          [''],
          [''],
        ]
      })
    }
    if(coordinates[0] === 2 && coordinates[1] === 3){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          ['B'],
          [''],
        ]
      })
    }
    if(coordinates[0] === 3 && coordinates[1] === 3){
      this.setState({
        ...this.state,
        grid: [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          ['B'],
        ]
      })
    }
    return this.state.grid
  }

  handleReset = () => {
    this.setState({
      coordinates: [2, 2],
      totalMoves: 0,
      message: '',
      grid: [
        [''],
        [''],
        [''],
        [''],
        ['B'],
        [''],
        [''],
        [''],
        [''],
      ],
      email: ''
    })
  }

  getActiveSquare = (square) => {
    if(square == 'B'){
      return 'square active'
    } else {
      return 'square'
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.coordinates !== this.state.coordinates){
      this.handleMove()
    }

    if(prevState.grid !== this.state.grid){
      this.state.grid.map((square, idx) => {
        this.getActiveSquare(square, idx)
      })
  }
  }

  render() {
    const { className } = this.props;

    return (
      <div id='wrapper' className={className}>
        <div className='info'>
          <h3 id='coordinates'>Coordinates {`(${this.state.coordinates})`}</h3>
          <h3 id='steps'>You moved {this.state.totalMoves} {this.state.totalMoves === 1 ? `time` : `times`}</h3>
        </div>
        <div id='grid'>
          {this.state.grid.map((square, idx) => {
              return (  
                <div className={this.getActiveSquare(square)} key={idx}>
                  {square}
                </div>
              )
            }
          )}
        </div>
        <div className='info'>
          <h3 id='message'>{this.state.message}</h3>
        </div>
        <div id='keypad'>
          <button id='left' onClick={() => this.handleDirection('left') }>
            LEFT
          </button>
          <button id='up' onClick={() => this.handleDirection('up')}>
            UP
          </button>
          <button id='right' onClick={() => this.handleDirection('right')}>
            RIGHT
          </button>
          <button id='down' onClick={() => this.handleDirection('down')}>
            DOWN
          </button>
          <button id='reset' onClick = {() => this.handleReset()}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input id='email' type='email' placeholder='type email' onChange={this.handleChange} value={this.state.email}></input>
          <input id='submit' type='submit' ></input>
        </form>
      </div>
    );
  }
}
