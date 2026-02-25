/**
 * 五目並べの盤面を描画するコンポーネントです。
 * SVGを使用して盤面の線、石、インタラクション領域を描画します。
 */
import React from 'react';
import type { BoardState, Player } from '../game/types';

/**
 * Boardコンポーネントのプロパティ定義
 */
interface BoardProps {
  board: BoardState;
  onCellClick: (x: number, y: number, event: React.MouseEvent) => void;
  winner: Player | 'Draw' | null;
}

export const BOARD_SIZE = 15;
export const CELL_SIZE = 40;
export const PADDING = 20;
export const TOTAL_SIZE = (BOARD_SIZE - 1) * CELL_SIZE + PADDING * 2;

export const Board: React.FC<BoardProps> = ({ board, onCellClick, winner }) => {
  const lines = [];
  const stones = [];
  const interactions = [];

  // Grid Lines
  for (let i = 0; i < BOARD_SIZE; i++) {
    const pos = PADDING + i * CELL_SIZE;

    // Vertical
    lines.push(
      <line
        key={`v-${i}`}
        x1={pos}
        y1={PADDING}
        x2={pos}
        y2={TOTAL_SIZE - PADDING}
        stroke="#000"
        strokeWidth="1"
      />
    );
    // Horizontal
    lines.push(
      <line
        key={`h-${i}`}
        x1={PADDING}
        y1={pos}
        x2={TOTAL_SIZE - PADDING}
        y2={pos}
        stroke="#000"
        strokeWidth="1"
      />
    );
  }

  // Stones and Interactions
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const cell = board[y][x];
      const cx = PADDING + x * CELL_SIZE;
      const cy = PADDING + y * CELL_SIZE;

      if (cell) {
        stones.push(
          <circle
            key={`stone-${x}-${y}`}
            cx={cx}
            cy={cy}
            r={CELL_SIZE * 0.4}
            fill={cell === 'Black' ? '#000' : '#fff'}
            stroke={cell === 'White' ? '#ccc' : 'none'}
            strokeWidth={cell === 'White' ? 1 : 0}
            style={{ pointerEvents: 'none' }}
          />
        );
      }

      // Invisible interaction area
      // インタラクション領域（クリック判定用）
      // 勝敗が決まっていない場合のみレンダリングします
      if (!winner) {
        interactions.push(
          <rect
            key={`cell-${x}-${y}`}
            x={cx - CELL_SIZE / 2}
            y={cy - CELL_SIZE / 2}
            width={CELL_SIZE}
            height={CELL_SIZE}
            fill="transparent"
            onClick={(e) => onCellClick(x, y, e)}
            style={{ cursor: 'pointer' }}
          />
        );
      }
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${TOTAL_SIZE} ${TOTAL_SIZE}`}
      style={{
        backgroundColor: '#e0c392',
        display: 'block',
        touchAction: 'none'
      }}
    >
      {lines}
      {stones}
      {interactions}
    </svg>
  );
};
