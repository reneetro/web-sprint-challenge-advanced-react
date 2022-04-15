import React from 'react';

export default class AppClass extends React.Component {
  state = {
    coordinates: [2, 2],
    totalMoves: 0,
    message: '',
    email: '',
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
  };

  handleDirection = (dir) => {
    const { coordinates } = this.state;
    if (dir === 'up') {
      if (coordinates[1] > 1) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0], coordinates[1] - 1],
          totalMoves: this.state.totalMoves+1
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go up!`,
        });
      }

    }
    if (dir === 'down') {
      if (coordinates[1] < 3) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0], coordinates[1] + 1],
          totalMoves: this.state.totalMoves+1
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go down!`,
        });
      }

    }
    if (dir === 'left') {
      if (coordinates[0] > 1) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0] - 1, coordinates[1]],
          totalMoves: this.state.totalMoves+1
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go left!`,
        });
      }

    }
    if (dir === 'right') {
      if (coordinates[0] < 3) {
        this.setState({
          ...this.state,
          coordinates: [coordinates[0] + 1, coordinates[1]],
          totalMoves: this.state.totalMoves+1
        });
      } else {
        this.setState({
          ...this.state,
          message: `You can't go right!`,
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.coordinates !== this.state.coordinates){
      this.handleMove()
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div id='wrapper' className={className}>
        <div className='info'>
          <h3 id='coordinates'>Coordinates {`(${this.state.coordinates})`}</h3>
          <h3 id='steps'>You moved {this.state.totalMoves} times</h3>
        </div>
        <div id='grid'>
          {this.state.grid.map((square, idx) => {
            return (
              
              <div className='square' key={idx}>
                {square}
              </div>
              
            );
          })}
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
          <button id='reset'>reset</button>
        </div>
        <form>
          <input id='email' type='email' placeholder='type email'></input>
          <input id='submit' type='submit'></input>
        </form>
      </div>
    );
  }
}
