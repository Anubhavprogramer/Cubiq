/**
 * Level 1 - Tutorial level
 * Simple 6x6 grid with limited obstacles
 */

import { GameConfig } from '../types';

export const LEVEL_1: GameConfig = {
  gridSize: 6,
  initialImmunity: 15,
  playerStart: {
    row: 0,
    col: 0,
  },
  destination: {
    row: 5,
    col: 5,
  },
  blockedCells: [
    { row: 1, col: 0 },
    { row: 2, col: 0 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    { row: 3, col: 3 },
    { row: 4, col: 3 },
    { row: 2, col: 5 },
    { row: 3, col: 5 },
    { row: 4, col: 1 },
  ],
};

export const LEVELS = [LEVEL_1];
