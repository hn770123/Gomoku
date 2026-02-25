/**
 * ゲーム全体を管理するコンポーネントです。
 * 盤面の状態管理、ズーム機能、ユーザーインターフェースを提供します。
 */
import React, { useState } from 'react';
import { useGomoku } from '../game/useGomoku';
import { Board, CELL_SIZE, PADDING, TOTAL_SIZE } from './Board';
import './Game.css';

export const Game: React.FC = () => {
  const { board, currentPlayer, winner, placeStone, resetGame } = useGomoku();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  /**
   * セルがクリックされたときの処理
   * - 未ズーム時: クリック位置を中心にズームイン
   * - ズーム時: 石を置いてズームアウト（既に石がある場合は何もしない）
   */
  const handleCellClick = (x: number, y: number, event: React.MouseEvent) => {
    if (winner) return;

    if (!isZoomed) {
      // ズームイン処理：クリック位置を計算して拡大起点に設定
      const svg = (event.currentTarget as Element).closest('svg');
      let px = 50;
      let py = 50;

      if (svg) {
        const rect = svg.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        px = (clickX / rect.width) * 100;
        py = (clickY / rect.height) * 100;

        // ズーム時の表示領域を制限（端に行き過ぎないようにする）
        // 20%〜80%の範囲に制限
        px = Math.max(20, Math.min(80, px));
        py = Math.max(20, Math.min(80, py));
      } else {
        // フォールバック（通常はここに来ない）
        px = ((PADDING + x * CELL_SIZE) / TOTAL_SIZE) * 100;
        py = ((PADDING + y * CELL_SIZE) / TOTAL_SIZE) * 100;
      }

      setZoomOrigin({ x: px, y: py });
      setIsZoomed(true);
    } else {
      // 既に石が置かれている場合は何もしない
      if (board[y][x]) {
        return;
      }
      // 石を置いてズームアウト
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
      ? `translate(${50 - zoomOrigin.x}%, ${50 - zoomOrigin.y}%) scale(2.5)`
      : 'scale(1)',
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
