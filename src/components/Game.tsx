import React, { useState } from 'react';
import { useGomoku } from '../game/useGomoku';
import { Board, CELL_SIZE, PADDING, TOTAL_SIZE } from './Board';
import './Game.css';

export const Game: React.FC = () => {
  const { board, currentPlayer, winner, placeStone, resetGame } = useGomoku();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleCellClick = (x: number, y: number) => {
    if (winner) return;

    if (!isZoomed) {
      // Calculate percentage position for transform-origin
      const px = ((PADDING + x * CELL_SIZE) / TOTAL_SIZE) * 100;
      const py = ((PADDING + y * CELL_SIZE) / TOTAL_SIZE) * 100;
      setZoomOrigin({ x: px, y: py });
      setIsZoomed(true);
    } else {
      // Place stone and zoom out
      placeStone(x, y);
      setIsZoomed(false);
    }
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  const handleResetGame = () => {
      resetGame();
      setIsZoomed(false);
  };

  const transformStyle: React.CSSProperties = {
    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
    transformOrigin: isZoomed ? `${zoomOrigin.x}% ${zoomOrigin.y}%` : 'center',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return (
    <div className="game-container">
      <div className="status-bar">
        {winner ? (
          <div className="winner-announcement">
            {winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`}
            <button onClick={handleResetGame} className="reset-button">New Game</button>
          </div>
        ) : (
          <div className="current-player">
            Current Player: <span className={`player-indicator ${currentPlayer.toLowerCase()}`}>{currentPlayer}</span>
            {isZoomed && <button onClick={handleZoomOut} className="zoom-out-button">Zoom Out</button>}
          </div>
        )}
      </div>
      <div className="board-wrapper">
        <div className="board-transform-layer" style={transformStyle}>
          <Board board={board} onCellClick={handleCellClick} winner={winner} />
        </div>
      </div>
      <p className="instruction">
        {winner ? "Game Over" : (isZoomed ? "Tap to place stone." : "Tap board to zoom in.")}
      </p>
    </div>
  );
};
