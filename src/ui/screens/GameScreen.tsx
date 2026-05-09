/**
 * Game screen - Main gameplay screen with grid and controls
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { useGameStore } from '../../state/stores/gameStore';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, GAME } from '../../constants';
import { GridCell } from '../components/game/GridCell';
import { Button } from '../components/ui-kit/Button';
import { GAME_CONFIG } from '../../constants/game';

interface GameScreenProps {
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  onGameWon?: () => void;
  onBackHome?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  difficulty = 'medium',
  onGameWon,
  onBackHome,
}) => {
  const {
    grid,
    moves,
    time,
    score,
    hints,
    engine,
    selectCell,
    deselectCell,
    clearSelection,
    createPatch,
    undo,
    restart,
  } = useGameStore();

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Time increment is handled by game logic
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for win condition
  useEffect(() => {
    if (grid && engine?.isSolved()) {
      onGameWon?.();
    }
  }, [grid?.cells, engine, onGameWon]);

  if (!grid || !engine) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading game...</Text>
      </View>
    );
  }

  const handleCellPress = (cellId: string) => {
    const cell = grid.cells.find((c) => c.id === cellId);
    if (!cell) return;

    if (cell.isSelected) {
      deselectCell(cellId);
    } else {
      selectCell(cellId);
    }
  };

  const handleCreatePatch = () => {
    // Get selected cells
    const selectedCells = grid.cells.filter((c) => c.isSelected);
    if (selectedCells.length === 0) return;

    const selectedCellIds = selectedCells.map((c) => c.id);
    const isValid = createPatch(selectedCellIds);
    if (!isValid) {
      console.log('Invalid patch');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={onBackHome}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>
        </View>
        <Text style={styles.headerTitle}>CUBIQ</Text>
        <View style={styles.headerRight}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{difficulty.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Game Stats */}
      <View style={styles.statsBar}>
        <StatItem icon="⏱️" label="Time" value={formatTime(time)} />
        <StatItem icon="🎯" label="Score" value={score.toString()} />
        <StatItem icon="👆" label="Moves" value={moves.toString()} />
        <StatItem icon="💡" label="Hints" value={hints.length.toString()} />
      </View>

      {/* Game Grid */}
      <ScrollView style={styles.gridContainer} contentContainerStyle={styles.gridContent}>
        <View style={styles.grid}>
          {grid.cells.map((cell) => (
            <Pressable
              key={cell.id}
              style={[
                styles.cellWrapper,
                {
                  width: `${100 / GAME_CONFIG.GRID_COLS}%`,
                  aspectRatio: 1,
                },
              ]}
              onPress={() => handleCellPress(cell.id)}
            >
              <GridCell
                id={cell.id}
                value={cell.targetSize}
                isSelected={cell.isSelected}
                color={
                  cell.patchId
                    ? `hsl(${(parseInt(cell.patchId) * 60) % 360}, 70%, 60%)`
                    : COLORS.gray
                }
                onPress={() => handleCellPress(cell.id)}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Clear"
          onPress={clearSelection}
          variant="outline"
          size="medium"
        />
        <Button
          title="Create Patch"
          onPress={handleCreatePatch}
          variant="primary"
          size="medium"
        />
        <Button
          title="Undo"
          onPress={undo}
          variant="outline"
          size="medium"
        />
        <Button
          title="Restart"
          onPress={restart}
          variant="outline"
          size="medium"
        />
      </View>
    </SafeAreaView>
  );
};

interface StatItemProps {
  icon: string;
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }: StatItemProps) => (
  <View style={styles.statItem}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.black,
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  difficultyBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  difficultyText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.black,
    fontWeight: '600',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.gray,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.darkGray,
  },
  statValue: {
    ...TYPOGRAPHY.button,
    color: COLORS.black,
    marginTop: SPACING.xs,
  },
  gridContainer: {
    flex: 1,
    paddingVertical: SPACING.lg,
  },
  gridContent: {
    paddingHorizontal: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  cellWrapper: {
    padding: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.darkGray,
  },
});
