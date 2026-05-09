/**
 * Home screen - Difficulty selection
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import { Button } from '../components/ui-kit';

interface HomeScreenProps {
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'endless') => void;
  onSettings?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectDifficulty, onSettings }) => {
  const difficulties = [
    {
      id: 'easy',
      name: 'Easy',
      description: 'Perfect for beginners',
      color: '#4CAF50',
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Balanced challenge',
      color: '#FF9800',
    },
    {
      id: 'hard',
      name: 'Hard',
      description: 'Push your limits',
      color: '#F44336',
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'Master only',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CUBIQ</Text>
        <Text style={styles.subtitle}>Infinite Puzzle Game</Text>
      </View>

      {/* Difficulty Selection */}
      <View style={styles.difficultySection}>
        <Text style={styles.sectionTitle}>Select Difficulty</Text>

        {difficulties.map((difficulty) => (
          <Pressable
            key={difficulty.id}
            style={[styles.difficultyCard, { borderLeftColor: difficulty.color }]}
            onPress={() => onSelectDifficulty(difficulty.id as any)}
          >
            <View style={styles.difficultyContent}>
              <Text style={styles.difficultyName}>{difficulty.name}</Text>
              <Text style={styles.difficultyDesc}>{difficulty.description}</Text>
            </View>
            <View style={styles.arrowIcon}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Daily Challenge Button */}
      <View style={styles.actionSection}>
        <Button
          title="🎯 Daily Challenge"
          onPress={() => onSelectDifficulty('medium')}
          variant="secondary"
          size="large"
        />
      </View>

      {/* Settings Button */}
      {onSettings && (
        <Pressable style={styles.settingsButton} onPress={onSettings}>
          <Text style={styles.settingsText}>⚙️ Settings</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    marginTop: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    letterSpacing: 3,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.darkGray,
  },
  difficultySection: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  difficultyCard: {
    backgroundColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
  },
  difficultyContent: {
    flex: 1,
  },
  difficultyName: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  difficultyDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.darkGray,
  },
  arrowIcon: {
    marginLeft: SPACING.md,
  },
  arrowText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  actionSection: {
    marginBottom: SPACING.lg,
  },
  settingsButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  settingsText: {
    ...TYPOGRAPHY.button,
    color: COLORS.darkGray,
  },
});
