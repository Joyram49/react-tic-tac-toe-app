import React from "react";
import Board from "./board";

const calculateWinner = (squares) => {
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
};

class Game extends React.Component {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  };

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // console.log(history);
    const currentSquare = history[history.length - 1];
    // console.log(currentSquare);
    const squares = currentSquare.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    // console.log(squares[i]);
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    // console.log(this.state);
  };

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;
    const currentSquare = history[this.state.stepNumber];
    const winner = calculateWinner(currentSquare.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to Start Game`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status = "";
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player : ` + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board onClick={this.handleClick} squares={currentSquare.squares} />
        </div>
        <div className='game-info'>
          <div className='status'>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
