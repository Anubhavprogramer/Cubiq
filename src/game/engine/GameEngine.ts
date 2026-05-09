/**
 * GameEngine - Main class for handling all game logic
 * Manages game state, movements, grid generation, and win/lose conditions
 */

import { GameState, Direction, Position, GameConfig } from '../types';
import { LEVEL_1 } from '../levels/Level1';

export interface GameEngineState {
  playerPosition: Position;
  immunity: number;
  moves: number;
  gameState: GameState;
  tracedPath: Position[];
}

export class GameEngine {
  private playerPosition: Position;
  private immunity: number;
  private initialImmunity: number;
  private moves: number;
  private gameState: GameState;
  private tracedPath: Position[] = [];
  private levelConfig: GameConfig;
  private blockedCells: Set<string>;
  private gridSize: number;

  constructor(level: GameConfig = LEVEL_1) {
    this.levelConfig = level;
    this.gridSize = level.gridSize;
    this.playerPosition = { ...level.playerStart };
    this.immunity = level.initialImmunity;
    this.initialImmunity = level.initialImmunity;
    this.moves = 0;
    this.gameState = GameState.PLAYING;
    
    // Initialize blocked cells set
    this.blockedCells = new Set<string>(
      level.blockedCells.map((pos: Position) => `${pos.row},${pos.col}`)
    );
  }

  /**
   * Get current game state
   */
  public getState(): GameEngineState {
    return {
      playerPosition: { ...this.playerPosition },
      immunity: this.immunity,
      moves: this.moves,
      gameState: this.gameState,
      tracedPath: [...this.tracedPath],
    };
  }

  /**
   * Handle player movement in a direction
   */
  public movePlayer(direction: Direction): GameEngineState {
    // Don't allow moves if game is not playing
    if (this.gameState !== GameState.PLAYING) {
      return this.getState();
    }

    let newRow = this.playerPosition.row;
    let newCol = this.playerPosition.col;
    const path: Position[] = [];

    // Slide in direction until hitting a blocked cell or boundary
    while (true) {
      let nextRow = newRow;
      let nextCol = newCol;

      switch (direction) {
        case Direction.UP:
          nextRow = newRow - 1;
          break;
        case Direction.DOWN:
          nextRow = newRow + 1;
          break;
        case Direction.LEFT:
          nextCol = newCol - 1;
          break;
        case Direction.RIGHT:
          nextCol = newCol + 1;
          break;
      }

      // Check boundaries
      if (nextRow < 0 || nextRow >= this.gridSize || nextCol < 0 || nextCol >= this.gridSize) {
        break;
      }

      // Check if next cell is blocked
      const cellKey = `${nextRow},${nextCol}`;
      if (this.blockedCells.has(cellKey)) {
        break;
      }

      // Move to next cell
      newRow = nextRow;
      newCol = nextCol;
      path.push({ row: newRow, col: newCol });
    }

    // Check if player actually moved
    if (newRow !== this.playerPosition.row || newCol !== this.playerPosition.col) {
      this.playerPosition = { row: newRow, col: newCol };
      this.tracedPath = path;
      
      // Calculate movement cost (number of cells moved)
      const movementCost = path.length;
      this.moves += movementCost;
      this.immunity = Math.max(0, this.immunity - movementCost);

      // Check win/lose conditions
      if (
        newRow === this.levelConfig.destination.row &&
        newCol === this.levelConfig.destination.col
      ) {
        this.gameState = GameState.WON;
      } else if (this.immunity <= 0) {
        this.gameState = GameState.LOST;
      }

      // Clear path after a delay
      setTimeout(() => {
        this.tracedPath = [];
      }, 500);
    }

    return this.getState();
  }

  /**
   * Reset game to initial state
   */
  public resetGame(): GameEngineState {
    this.playerPosition = { ...this.levelConfig.playerStart };
    this.immunity = this.initialImmunity;
    this.moves = 0;
    this.gameState = GameState.PLAYING;
    this.tracedPath = [];

    return this.getState();
  }

  /**
   * Pause game
   */
  public pauseGame(): GameEngineState {
    if (this.gameState === GameState.PLAYING) {
      this.gameState = GameState.PAUSED;
    }
    return this.getState();
  }

  /**
   * Resume game
   */
  public resumeGame(): GameEngineState {
    if (this.gameState === GameState.PAUSED) {
      this.gameState = GameState.PLAYING;
    }
    return this.getState();
  }

  /**
   * Get blocked cells
   */
  public getBlockedCells(): Set<string> {
    return new Set(this.blockedCells);
  }

  /**
   * Get destination position
   */
  public getDestination(): Position {
    return { ...this.levelConfig.destination };
  }

  /**
   * Get level config
   */
  public getLevelConfig(): GameConfig {
    return this.levelConfig;
  }

  /**
   * Check if a position is blocked
   */
  public isBlocked(row: number, col: number): boolean {
    return this.blockedCells.has(`${row},${col}`);
  }

  /**
   * Get grid size
   */
  public getGridSize(): number {
    return this.gridSize;
  }

  /**
   * Move player ONE cell in a direction (for tap-to-move)
   * Unlike movePlayer, this doesn't slide - just moves one cell if possible
   */
  public moveOneCell(direction: Direction): GameEngineState {
    // Don't allow moves if game is not playing
    if (this.gameState !== GameState.PLAYING) {
      return this.getState();
    }

    let newRow = this.playerPosition.row;
    let newCol = this.playerPosition.col;

    // Calculate next position
    switch (direction) {
      case Direction.UP:
        newRow = this.playerPosition.row - 1;
        break;
      case Direction.DOWN:
        newRow = this.playerPosition.row + 1;
        break;
      case Direction.LEFT:
        newCol = this.playerPosition.col - 1;
        break;
      case Direction.RIGHT:
        newCol = this.playerPosition.col + 1;
        break;
    }

    // Check if move is valid
    const isOutOfBounds = newRow < 0 || newRow >= this.gridSize || newCol < 0 || newCol >= this.gridSize;
    const isBlocked = this.blockedCells.has(`${newRow},${newCol}`);

    if (isOutOfBounds || isBlocked) {
      return this.getState();
    }

    // Move player one cell
    this.playerPosition = { row: newRow, col: newCol };
    this.tracedPath = [{ row: newRow, col: newCol }];
    
    // Movement cost is 1 for single cell move
    this.moves += 1;
    this.immunity = Math.max(0, this.immunity - 1);

    // Check win/lose conditions
    if (
      newRow === this.levelConfig.destination.row &&
      newCol === this.levelConfig.destination.col
    ) {
      this.gameState = GameState.WON;
    } else if (this.immunity <= 0) {
      this.gameState = GameState.LOST;
    }

    // Clear path after a delay
    setTimeout(() => {
      this.tracedPath = [];
    }, 300);

    return this.getState();
  }
}

/**
 * Singleton instance of GameEngine
 */
let gameEngineInstance: GameEngine | null = null;

export function initializeGameEngine(level?: GameConfig): GameEngine {
  gameEngineInstance = new GameEngine(level);
  return gameEngineInstance;
}

export function getGameEngine(): GameEngine {
  if (!gameEngineInstance) {
    gameEngineInstance = new GameEngine();
  }
  return gameEngineInstance;
}
