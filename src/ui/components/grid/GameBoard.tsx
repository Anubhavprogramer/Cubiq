import React, { useMemo } from 'react';
import { StyleSheet, View, Dimensions, GestureResponderEvent } from 'react-native';
import ThemedText from '../ThemedComponents/ThemedText';
import { colors } from '../../../utils/colors';
import { Margin, Padding, BorderRadius } from '../../../utils/spacing';
import { GameState, CellType, Direction, Position } from '../../../game/types';

const { width } = Dimensions.get('window');
const GRID_SIZE = 6;
const CELL_SIZE = Math.floor((width - Padding.large * 2 - 6) / GRID_SIZE);

// Color palette
const CELL_COLORS = {
  empty: '#FFFFFF',           // White - empty cell
  blocked: '#2D3436',         // Dark gray - blocked/inaccessible
  player: '#e1bf70ff',        // Yellow - player
  destination: '#FF6B6B',     // Red - destination
  border: '#CCCCCC',          // Light gray - borders
};

interface GameBoardProps {
  playerPosition: { row: number; col: number };
  tracedPath: Array<{ row: number; col: number }>;
  blockedCells: Set<string>;
  destination: Position;
  onSwipe: (direction: Direction) => void;
  onCellTap: (row: number, col: number) => void;
  onTouchStart: (e: GestureResponderEvent) => void;
  onTouchEnd: (e: GestureResponderEvent) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  playerPosition,
  tracedPath,
  blockedCells,
  destination,
  onSwipe,
  onCellTap,
  onTouchStart,
  onTouchEnd,
}) => {
  // Destination position as string key
  const destinationPos = `${destination.row},${destination.col}`;

  const renderCell = (row: number, col: number) => {
    const cellKey = `${row},${col}`;
    let backgroundColor = CELL_COLORS.empty;
    let borderColor = CELL_COLORS.border;
    let content = null;
    let textColor = colors.text;

    // Check if cell is in traced path
    const isInPath = tracedPath.some(pos => pos.row === row && pos.col === col);
    if (isInPath) {
      backgroundColor = '#FFE082';  // Light yellow - path highlighting
      borderColor = '#FFB300';      // Darker yellow for path border
    }
    // Check if cell is blocked
    else if (blockedCells.has(cellKey)) {
      backgroundColor = CELL_COLORS.blocked;
      borderColor = '#444444';
    }
    // Check if cell is player position
    else if (playerPosition.row === row && playerPosition.col === col) {
      backgroundColor = CELL_COLORS.player;
      borderColor = '#D4A537';
      content = '●';
      textColor = colors.text;
    }
    // Check if cell is destination
    else if (cellKey === destinationPos) {
      backgroundColor = CELL_COLORS.destination;
      borderColor = '#CC5555';
      content = '★';
      textColor = '#FFFFFF';
    }

    return (
      <View
        key={`cell-${row}-${col}`}
        style={[
          styles.cell,
          {
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor,
            borderColor,
          },
        ]}
        onTouchStart={onTouchStart}
        onTouchEnd={(e) => {
          onTouchEnd(e);
          // On single tap (no swipe), move to this cell
          onCellTap(row, col);
        }}
      >
        {content && (
          <ThemedText
            style={[
              styles.cellContent,
              {
                color: textColor,
              },
            ]}
          >
            {content}
          </ThemedText>
        )}
      </View>
    );
  };

  return (
    <View>
      {Array.from({ length: GRID_SIZE }).map((_, row) => (
        <View key={`row-${row}`} style={styles.row}>
          {Array.from({ length: GRID_SIZE }).map((_, col) =>
            renderCell(row, col)
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
