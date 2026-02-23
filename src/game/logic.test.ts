/**
 * ゲームロジックのテストモジュール
 */
import { describe, it, expect } from 'vitest';
import { createBoard, checkWin, BOARD_SIZE } from './logic';
import type { Player } from './types';

describe('Gomoku Logic', () => {
  it('should detect a horizontal win', () => {
    const board = createBoard();
    const player: Player = 'Black';
    // Place 5 stones horizontally
    for (let i = 0; i < 5; i++) {
      board[0][i] = player;
    }
    // Check win at the last placed stone
    expect(checkWin(board, 4, 0, player)).toBe(true);
    // Check win at the middle stone
    expect(checkWin(board, 2, 0, player)).toBe(true);
  });

  it('should detect a vertical win', () => {
    const board = createBoard();
    const player: Player = 'White';
    for (let i = 0; i < 5; i++) {
      board[i][0] = player;
    }
    expect(checkWin(board, 0, 4, player)).toBe(true);
  });

  it('should detect a diagonal win (\\)', () => {
    const board = createBoard();
    const player: Player = 'Black';
    for (let i = 0; i < 5; i++) {
      board[i][i] = player;
    }
    expect(checkWin(board, 4, 4, player)).toBe(true);
  });

  it('should detect a diagonal win (/)', () => {
    const board = createBoard();
    const player: Player = 'White';
    for (let i = 0; i < 5; i++) {
      board[i][4 - i] = player; // (4,0), (3,1), (2,2), (1,3), (0,4)
    }
    expect(checkWin(board, 0, 4, player)).toBe(true);
  });

  it('should not detect a win with only 4 stones', () => {
    const board = createBoard();
    const player: Player = 'Black';
    for (let i = 0; i < 4; i++) {
      board[0][i] = player;
    }
    expect(checkWin(board, 3, 0, player)).toBe(false);
  });

  it('should handle boundary conditions', () => {
    const board = createBoard();
    const player: Player = 'Black';
    // Place 5 stones at the bottom-right
    for (let i = 0; i < 5; i++) {
      board[BOARD_SIZE - 1][BOARD_SIZE - 1 - i] = player;
    }
    expect(checkWin(board, BOARD_SIZE - 1, BOARD_SIZE - 1, player)).toBe(true);
  });

  it('should detect a win with more than 5 stones (freestyle)', () => {
      const board = createBoard();
      const player: Player = 'Black';
      for (let i = 0; i < 6; i++) {
          board[0][i] = player;
      }
      expect(checkWin(board, 5, 0, player)).toBe(true);
  });
});
