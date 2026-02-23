import { useState, useCallback } from 'react';
import type { BoardState, GameResult, Player } from './types';
import { createBoard, checkWin } from './logic';

export const useGomoku = () => {
  const [board, setBoard] = useState<BoardState>(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Black');
  const [winner, setWinner] = useState<GameResult>(null);

  const placeStone = useCallback((x: number, y: number) => {
    if (winner || board[y][x]) return;

    const newBoard = board.map(row => [...row]);
    newBoard[y][x] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, x, y, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      // Check for draw (full board)
      const isFull = newBoard.every(row => row.every(cell => cell !== null));
      if (isFull) {
        setWinner('Draw');
      } else {
        setCurrentPlayer(prev => prev === 'Black' ? 'White' : 'Black');
      }
    }
  }, [board, currentPlayer, winner]);

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setCurrentPlayer('Black');
    setWinner(null);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    placeStone,
    resetGame
  };
};
