import React, { useState } from 'react';
import { useGomoku } from '../game/useGomoku';
import { Board, CELL_SIZE, PADDING, TOTAL_SIZE } from './Board';
import './Game.css';

export const Game: React.FC = () => {
  const { board, currentPlayer, winner, placeStone, resetGame } = useGomoku();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 });

  const handleCellClick = (x: number, y: number) => {
    if (winner) return;

    if (!isZoomed) {
      // Calculate percentage position
      const px = ((PADDING + x * CELL_SIZE) / TOTAL_SIZE) * 100;
      const py = ((PADDING + y * CELL_SIZE) / TOTAL_SIZE) * 100;

      const ZOOM_SCALE = 2.5;
      const VISIBLE_PCT = 100 / ZOOM_SCALE; // 40%
      const HALF_VISIBLE = VISIBLE_PCT / 2; // 20%

      // Clamp the center position so the viewport doesn't go off-board
      const clampedX = Math.max(HALF_VISIBLE, Math.min(100 - HALF_VISIBLE, px));
      const clampedY = Math.max(HALF_VISIBLE, Math.min(100 - HALF_VISIBLE, py));

      // Calculate translation to bring the clamped center to the center of the view
      // We want the top-left of the visible area (clamped - HALF_VISIBLE) to be at 0
      const tx = -(clampedX - HALF_VISIBLE) * ZOOM_SCALE;
      const ty = -(clampedY - HALF_VISIBLE) * ZOOM_SCALE;

      setZoomTranslate({ x: tx, y: ty });
      setIsZoomed(true);
    } else {
      // If cell is occupied, do not zoom out (as per user request)
      if (board[y][x]) {
        return;
      }
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
    transform: isZoomed
      ? `translate(${zoomTranslate.x}%, ${zoomTranslate.y}%) scale(2.5)`
      : 'translate(0, 0) scale(1)',
    transformOrigin: '0 0',
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
