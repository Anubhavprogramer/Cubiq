import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "../components/ThemedComponents/ThemedText";
import { colors } from "../../utils/colors";
import { Margin, Padding, BorderRadius } from "../../utils/spacing";
import Header from "../components/Header";
import BackHeader from "../components/BackHearder";
import { GameState, Direction } from "../../game/types";
import { GameBoard } from "../components/grid/GameBoard";
import { GameEngine } from "../../game/engine/GameEngine";
import { LEVEL_1 } from "../../game/levels/Level1";

const SWIPE_THRESHOLD = 20;

interface GameScreenProps {}

export const GameScreen: React.FC<GameScreenProps> = () => {
  const navigation = useNavigation<any>();
  
  // Game engine instance
  const gameEngineRef = useRef<GameEngine | null>(null);
  
  // State management
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [immunity, setImmunity] = useState(20);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  const [tracedPath, setTracedPath] = useState<Array<{ row: number; col: number }>>([]);
  
  // Gesture tracking
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Handle swipe gesture
  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartRef.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    const touchEnd = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;

    // Determine swipe direction
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      // Horizontal swipe
      if (dx > 0) {
        movePlayer(Direction.RIGHT);
      } else {
        movePlayer(Direction.LEFT);
      }
    } else if (Math.abs(dy) > SWIPE_THRESHOLD) {
      // Vertical swipe
      if (dy > 0) {
        movePlayer(Direction.DOWN);
      } else {
        movePlayer(Direction.UP);
      }
    }
  };

  const movePlayer = (direction: Direction) => {
    if (!gameEngineRef.current) return;
    
    const newState = gameEngineRef.current.movePlayer(direction);
    
    // Update React state from game engine state
    setPlayerPosition(newState.playerPosition);
    setImmunity(newState.immunity);
    setMoves(newState.moves);
    setGameState(newState.gameState);
    setTracedPath(newState.tracedPath);
  };

  const resetGame = () => {
    if (!gameEngineRef.current) return;
    
    const newState = gameEngineRef.current.resetGame();
    
    setPlayerPosition(newState.playerPosition);
    setImmunity(newState.immunity);
    setMoves(newState.moves);
    setGameState(newState.gameState);
    setTracedPath(newState.tracedPath);
  };

  /**
   * Calculate direction to move towards target cell
   * Returns the direction the player should move to get closer to the target
   */
  const getDirectionToCell = (targetRow: number, targetCol: number): Direction | null => {
    if (!gameEngineRef.current) return null;

    const current = gameEngineRef.current.getState().playerPosition;

    // Determine primary direction based on position difference
    const rowDiff = targetRow - current.row;
    const colDiff = targetCol - current.col;

    // If already at target
    if (rowDiff === 0 && colDiff === 0) return null;

    // Prioritize horizontal or vertical movement based on what's needed more
    if (Math.abs(colDiff) > Math.abs(rowDiff)) {
      // Move horizontally
      return colDiff > 0 ? Direction.RIGHT : Direction.LEFT;
    } else {
      // Move vertically
      return rowDiff > 0 ? Direction.DOWN : Direction.UP;
    }
  };

  /**
   * Handle cell tap - move player ONE cell towards tapped cell
   */
  const handleCellTap = (tapRow: number, tapCol: number) => {
    if (!gameEngineRef.current) return;

    const current = gameEngineRef.current.getState().playerPosition;

    // Don't move if tapping on current position, blocked cell, or if game is over
    if (
      (tapRow === current.row && tapCol === current.col) ||
      gameEngineRef.current.isBlocked(tapRow, tapCol) ||
      gameEngineRef.current.getState().gameState !== GameState.PLAYING
    ) {
      return;
    }

    // Calculate direction to move towards the tapped cell
    const direction = getDirectionToCell(tapRow, tapCol);
    if (direction !== null) {
      // Use moveOneCell instead of movePlayer for single cell movement
      const newState = gameEngineRef.current.moveOneCell(direction);
      
      // Update React state from game engine state
      setPlayerPosition(newState.playerPosition);
      setImmunity(newState.immunity);
      setMoves(newState.moves);
      setGameState(newState.gameState);
      setTracedPath(newState.tracedPath);
    }
  };

  // Initialize game engine on mount
  useEffect(() => {
    gameEngineRef.current = new GameEngine(LEVEL_1);
    const initialState = gameEngineRef.current.getState();
    
    setPlayerPosition(initialState.playerPosition);
    setImmunity(initialState.immunity);
    setMoves(initialState.moves);
    setGameState(initialState.gameState);
    setTracedPath(initialState.tracedPath);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Moves</ThemedText>
            <ThemedText style={styles.statValue}>{moves}</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Immunity</ThemedText>
            <ThemedText
              style={[
                styles.statValue,
                {
                  color:
                    immunity <= 3 && immunity > 0
                      ? '#EF4444'
                      : immunity > 0
                        ? '#10B981'
                        : '#888888',
                },
              ]}
            >
              {immunity}
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Level</ThemedText>
            <ThemedText style={styles.statValue}>1</ThemedText>
          </View>
        </View>

        {/* Game Board */}
        <GameBoard
          playerPosition={playerPosition}
          tracedPath={tracedPath}
          blockedCells={gameEngineRef.current?.getBlockedCells() || new Set()}
          destination={gameEngineRef.current?.getDestination() || { row: 5, col: 5 }}
          onSwipe={movePlayer}
          onCellTap={handleCellTap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        {/* Win/Lose Messages */}
        {gameState === GameState.WON && (
          <View style={styles.messageBox}>
            <ThemedText style={styles.messageTitle}>🎉 You Won!</ThemedText>
            <ThemedText style={styles.messageSubtitle}>
              Completed in {moves} moves with {immunity} immunity left
            </ThemedText>
          </View>
        )}

        {gameState === GameState.LOST && (
          <View style={styles.messageBox}>
            <ThemedText style={styles.messageTitle}>Game Over</ThemedText>
            <ThemedText style={styles.messageSubtitle}>
              No immunity remaining. Try again!
            </ThemedText>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.restartButton]}
            onPress={resetGame}
          >
            <ThemedText style={styles.buttonText}>Restart</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.homeButton]}
            onPress={() => navigation.navigate('Landing')}
          >
            <ThemedText style={styles.buttonText}>Home</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Padding.large,
    paddingVertical: Padding.medium,
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Margin.large,
    backgroundColor: colors.whiteText,
    borderRadius: BorderRadius.medium,
    paddingVertical: Padding.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    marginBottom: Margin.xsmall,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  messageBox: {
    backgroundColor: colors.primary,
    borderRadius: BorderRadius.medium,
    padding: Padding.large,
    alignItems: 'center',
    marginVertical: Margin.medium,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: Margin.small,
  },
  messageSubtitle: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: Padding.large,
    paddingVertical: Padding.medium,
    borderRadius: BorderRadius.medium,
    minWidth: 100,
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: colors.primary,
  },
  homeButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.background,
  },
});
