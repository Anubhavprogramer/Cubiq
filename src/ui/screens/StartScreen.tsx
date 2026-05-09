import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>
          <Text style={styles.appName}>CUBIQ</Text>
          <Text style={styles.tagline}>Infinite Puzzle Game</Text>
        </View>

        <View style={styles.featuresSection}>
          <FeatureItem icon="🎮" title="Endless Levels" description="Procedurally generated puzzles" />
          <FeatureItem icon="⚡" title="Relaxing" description="No time pressure, pure logic" />
          <FeatureItem icon="🏆" title="Achievements" description="Unlock badges & streaks" />
        </View>

        <Pressable style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Start Playing</Text>
        </Pressable>

        <Text style={styles.versionText}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
};

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.black,
    fontSize: 48,
  },
  appName: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.black,
    marginBottom: SPACING.xs,
    letterSpacing: 2,
  },
  tagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.darkGray,
  },
  featuresSection: {
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  featureIcon: {
    fontSize: 28,
    marginRight: SPACING.md,
    width: 40,
    textAlign: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...TYPOGRAPHY.button,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  featureDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.darkGray,
  },
  startButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    ...TYPOGRAPHY.heading3,
    color: COLORS.black,
  },
  versionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.lightGray,
    marginTop: SPACING.xxl,
  },
});
