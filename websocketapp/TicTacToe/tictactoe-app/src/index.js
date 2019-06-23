import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button
      className="square"
      onClick={props.onClick}>
      {props.value}
      </button>
    )
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square
    value={ this.props.square[i]}
    onClick={() => this.props.onClick(i) }
    />;
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        square: Array(9).fill(null)
      }],
      xIsNext: true,
    }
  }
  handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];

      const squares = current.square.slice();
      if(calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext? 'X' : 'O';
      this.setState({
        history: history.concat([{
          square: squares,
        }]),
        xIsNext: !this.state.xIsNext,
      });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner  = calculateWinner(current.square);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #'+move :
      'Go to start of game';

      return (
        <li>
          <button onClick={()=>{this.jumpTo(move)}}>{desc}</button>
        </li>
      );
    });
    let status;
    if(winner) {
      status = 'Winner is '+winner;
    }else{
      const isMatchDrawn = isDrawn(current.square);
      if(isMatchDrawn) {
        status = 'Match Drawn';
      }else{
        status = 'Next player is ' + (this.state.xIsNext? 'X' : 'O');
      }
    }

    return (
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-board">
          <Board
          square={current.square}
          onClick={(i)=>{this.handleClick(i)}}
          />
        </div>

      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isDrawn(squares) {
  for(let i = 0; i < squares.length; i++) {
    if(squares[i] === null)
      return false;
  }

  return true;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
