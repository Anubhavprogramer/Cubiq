/**
 * Game Type Definitions and Enums
 */

export enum CellType {
  EMPTY = 'EMPTY',
  BLOCKED = 'BLOCKED',
  PLAYER = 'PLAYER',
  DESTINATION = 'DESTINATION',
}

export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
  PAUSED = 'PAUSED',
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface Position {
  row: number;
  col: number;
}

export interface Cell {
  type: CellType;
  position: Position;
}

export interface Grid {
  cells: Cell[][];
  size: number;
}

export interface GameConfig {
  gridSize: number;
  initialImmunity: number;
  playerStart: Position;
  destination: Position;
  blockedCells: Position[];
}

export interface GamePlayState {
  playerPosition: Position;
  immunity: number;
  moves: number;
  gameState: GameState;
  grid: Grid;
  timePlayed: number;
  moveHistory: Direction[];
}

export interface MoveResult {
  success: boolean;
  newPosition?: Position;
  immunityRemaining?: number;
  gameState?: GameState;
  message?: string;
}
