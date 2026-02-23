import type { BoardState, Player } from './types';

export const BOARD_SIZE = 15;

/**
 * Creates an empty 15x15 board.
 */
export const createBoard = (): BoardState =>
  Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

/**
 * Checks if the player has won after placing a stone at (x, y).
 * Uses the "Freestyle Gomoku" rule (5 or more in a row wins).
 */
export const checkWin = (board: BoardState, x: number, y: number, player: Player): boolean => {
  // Although the function assumes the stone is already placed, checking again is safe
  if (board[y][x] !== player) return false;

  const directions = [
    [1, 0], // Horizontal
    [0, 1], // Vertical
    [1, 1], // Diagonal \
    [1, -1] // Diagonal /
  ];

  for (const [dx, dy] of directions) {
    let count = 1;

    // Check forward
    for (let i = 1; i < 5; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board[ny][nx] === player) {
        count++;
      } else {
        break;
      }
    }

    // Check backward
    for (let i = 1; i < 5; i++) {
      const nx = x - dx * i;
      const ny = y - dy * i;
      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE && board[ny][nx] === player) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 5) return true;
  }

  return false;
};
