// Code modified from https://www.youtube.com/watch?v=O7lLLMTeTVo
// https://github.com/dejwid/react-tic-tac-toe

import './TicTacToe.css';
import Board from "./Board";
import Square from "./Square";
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ModeAnimated from '../images/mode-animated.gif';
import ModeStatic from '../images/mode.png';

const defaultSquares = () => (new Array(9)).fill(null);

const lines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
];

function TicTacToe() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const emptyIndexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val !== null);
    const playerWon = linesThatAre('x', 'x', 'x').length > 0;
    const computerWon = linesThatAre('o', 'o', 'o').length > 0;
    if (playerWon) {
      setWinner('x');
    }
    if (computerWon) {
      setWinner('o');
    }

    // Giving delay to computer turn after user clicks
    const putComputerAtSquare = index => {
      setTimeout(() => putComputerAt(index), 1500);
    }

    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };

    if (isComputerTurn) {

      const winingLines = linesThatAre('o', 'o', null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        putComputerAtSquare(winIndex);
        return;
      }

      const linesToBlock = linesThatAre('x', 'x', null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAtSquare(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre('o', null, null);
      if (linesToContinue.length > 0) {
        putComputerAtSquare(linesToContinue[0].filter(index => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length) ];
      putComputerAtSquare(randomIndex);

;
    }
  }, [squares]);

  function handleSquareClick(index) {
    // To prevent user from clicking more squares after a winner has been declared
    if (winner == null) {
      const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
      if (isPlayerTurn) {
        let newSquares = squares;
        newSquares[index] = 'x';
        setSquares([...newSquares]);
      }
    }
  }

  return (
    <main className="tictactoe">
       <header>
        <h1>FocusMode</h1>
      </header>
        <h2>Tic Tac Toe</h2>
      <Board>
        {squares.map((square,index) =>
          <Square
            x={square==='x'?1:0}
            o={square==='o'?1:0}
            onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      <picture>
        <source srcSet={ModeStatic} media="(prefers-reduced-motion: reduce)"></source> 
        <img className="modeAnimated" srcSet={ModeAnimated} alt="Animated character"/>
      </picture>
        <Link className="backBtn" to="/">Back to Timer</Link>
      {!!winner && winner === 'x' && (
        <div className="result">
          <h3>You win!</h3>
        </div>
      )}
      {!!winner && winner === 'o' && (
        <div className="result">
          <h3>Mode wins!</h3>
        </div>
      )}
    </main>
  );
}

export default TicTacToe;
