/**
 * ゲームのロジック（勝敗判定など）を提供するモジュールです。
 */
import type { BoardState, Player } from './types';

export const BOARD_SIZE = 15;

/**
 * 15x15の空の盤面を作成します。
 */
export const createBoard = (): BoardState =>
  Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

/**
 * 指定された位置(x, y)に石を置いた後の勝敗を判定します。
 * フリースタイル五目並べのルール（5つ以上並べば勝ち）を採用しています。
 *
 * @param board 現在の盤面状態
 * @param x 石を置いたX座標
 * @param y 石を置いたY座標
 * @param player 石を置いたプレイヤー
 * @returns 勝利した場合はtrue、そうでない場合はfalse
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
