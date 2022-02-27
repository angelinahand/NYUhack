import React from 'react';
import Rock from './rockPaperScissors/icons/rock.png';
import Paper from './rockPaperScissors/icons/paper.png';
import Scissors from './rockPaperScissors/icons/scissor.png';

import './rockPaperScissors/App.css';

export default function App() {
    alert('Hello... welcome to Rock Paper Scissors with Mode!');
    return (
      <div className="app">
        {/* information goes here */}
        <div className="info">
          <h2>Rock. Paper. Scissors</h2>
  
          {/* wins vs losses stats */}
          <div className="wins-losses">
            <div className="wins">
              <span className="number">0</span>
              <span className="text">Streak!</span>
            </div>
  
            <div className="losses">
              <span className="number">0</span>
              <span className="text">Losses</span>
            </div>
          </div>
        </div>
  
        {/* the popup to show win/loss/draw */}
        {/* <div className="game-state"></div> */}
  
        <div className="choices">
          {/* choices captions */}
          <div>You</div>
          <div />
          <div>Mode</div>
  
          {/* buttons for my choice */}
          <div>
            <button className="rock">
              <Rock />
            </button>
            <button className="paper">
              <Paper />
            </button>
            <button className="scissors">
              <Scissors />
            </button>
          </div>
  
          <div className="vs">vs</div>
  
          {/* show the computer's choice */}
          <div>
            <button className="computer-choice">?</button>
          </div>
        </div>
      </div>
    );
  }