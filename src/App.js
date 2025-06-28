import React, { useState } from 'react';
import './App.css';

function App() {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState([]);
  const [totalRolls, setTotalRolls] = useState(0);

  const rollDice = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(newNumber);
      setIsRolling(false);
      setHistory(prev => [...prev, newNumber].slice(-5));  // เก็บแค่ 5 ครั้งล่าสุด
      setTotalRolls(prev => prev + 1);
    }, 1000);
  };

  // สร้างจุดบนลูกเต๋าตามตัวเลข
  const renderDiceDots = () => {
    const dots = [];
    for (let i = 0; i < diceNumber; i++) {
      dots.push(<div key={i} className="dice-dot"></div>);
    }
    return dots;
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="title">🎲 เกมทอยลูกเต๋า 🎲</h1>
        
        <div className="stats">
          <div className="stat-box">
            <span className="stat-label">จำนวนครั้งที่ทอย</span>
            <span className="stat-value">{totalRolls}</span>
          </div>
        </div>

        <div className="dice-container">
          <div className={`dice ${isRolling ? 'rolling' : ''}`}>
            <div className="dice-dots">
              {renderDiceDots()}
            </div>
          </div>
          
          <button 
            onClick={rollDice} 
            disabled={isRolling}
            className="roll-button"
          >
            {isRolling ? '🎲 กำลังทอย...' : '🎲 ทอยลูกเต๋า'}
          </button>
        </div>

        {history.length > 0 && (
          <div className="history">
            <h3>ผลการทอย 5 ครั้งล่าสุด</h3>
            <div className="history-dots">
              {history.map((num, index) => (
                <div key={index} className="history-item">
                  <div className="mini-dice">
                    {Array(num).fill().map((_, i) => (
                      <div key={i} className="mini-dot"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 