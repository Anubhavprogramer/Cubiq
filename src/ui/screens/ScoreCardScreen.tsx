import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import { GameState, LevelMetadata } from '../../core/types';

interface ScoreCardScreenProps {
  gameState: GameState;
  levelMetadata?: LevelMetadata;
  onPlayAgain: () => void;
  onBackHome: () => void;
}

export const ScoreCardScreen: React.FC<ScoreCardScreenProps> = ({
  gameState,
  levelMetadata,
  onPlayAgain,
  onBackHome,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = (): { rating: string; color: string } => {
    if (gameState.score >= 1000) return { rating: '★★★ Perfect!', color: COLORS.primary };
    if (gameState.score >= 700) return { rating: '★★ Excellent!', color: COLORS.primary };
    if (gameState.score >= 500) return { rating: '★ Good!', color: COLORS.secondary };
    return { rating: 'Complete!', color: COLORS.darkGray };
  };

  const rating = getScoreRating();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} scrollEnabled={false}>
        <View style={styles.headerSection}>
          <Text style={styles.victoryIcon}>🎉</Text>
          <Text style={styles.victoryText}>Puzzle Solved!</Text>
          <Text style={[styles.ratingText, { color: rating.color }]}>
            {rating.rating}
          </Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Final Score</Text>
            <Text style={styles.scoreValue}>{gameState.score}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={[styles.scoreItem, { flex: 1 }]}>
              <Text style={styles.scoreLabel}>Time</Text>
              <Text style={styles.scoreValue}>{formatTime(gameState.time)}</Text>
            </View>
            <View style={styles.statsColumn} />
            <View style={[styles.scoreItem, { flex: 1 }]}>
              <Text style={styles.scoreLabel}>Moves</Text>
              <Text style={styles.scoreValue}>{gameState.moves}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Hints Used</Text>
            <Text style={styles.scoreValue}>{gameState.hints.length}</Text>
          </View>

          {levelMetadata && (
            <>
              <View style={styles.divider} />
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Difficulty</Text>
                <Text style={styles.scoreValue}>
                  {levelMetadata.difficulty}
                </Text>
              </View>
            </>
          )}
        </View>

        {gameState.score > 500 && (
          <View style={styles.bonusSection}>
            <Text style={styles.bonusTitle}>Bonus Points Earned!</Text>
            {gameState.moves < 20 && (
              <Text style={styles.bonusItem}>⚡ Efficiency Bonus: +50</Text>
            )}
            {gameState.time < 120 && (
              <Text style={styles.bonusItem}>⏱️ Speed Bonus: +50</Text>
            )}
            {gameState.hints.length === 0 && (
              <Text style={styles.bonusItem}>🎯 Perfect Solving: +100</Text>
            )}
          </View>
        )}

        <View style={styles.statsPreview}>
          <Text style={styles.statsPreviewTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <StatItem icon="🎮" label="Games" value="0" />
            <StatItem icon="🏆" label="Wins" value="0" />
            <StatItem icon="🔥" label="Streak" value="0" />
            <StatItem icon="⭐" label="Personal Best" value="—" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonSection}>
        <Pressable style={[styles.button, styles.primaryButton]} onPress={onPlayAgain}>
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={onBackHome}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
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
  content: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  victoryIcon: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  victoryText: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  ratingText: {
    ...TYPOGRAPHY.heading3,
    fontSize: 18,
  },
  scoreCard: {
    backgroundColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  scoreItem: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  scoreLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  scoreValue: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsColumn: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  bonusSection: {
    backgroundColor: '#FFF9E6',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  bonusTitle: {
    ...TYPOGRAPHY.button,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  bonusItem: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  statsPreview: {
    marginBottom: SPACING.xl,
  },
  statsPreviewTitle: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  statItem: {
    width: '48%',
    backgroundColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.sm,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.button,
    color: COLORS.black,
  },
  buttonSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  button: {
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.black,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.primary,
  },
});
