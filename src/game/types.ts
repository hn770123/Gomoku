/**
 * ゲームで使用される型定義
 */
export type Player = 'Black' | 'White';
export type BoardState = (Player | null)[][];
export type GameResult = Player | 'Draw' | null;
