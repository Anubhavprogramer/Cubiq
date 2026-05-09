/**
 * Root Navigation - Connect all screens
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../constants';

// Screens
import { StartScreen } from '../screens/StartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { GameScreen } from '../screens/GameScreen';
import { ScoreCardScreen } from '../screens/ScoreCardScreen';

// App Config
import * as appConfigModule from '../../appConfig';
import { useGameStore } from '../../state/stores/gameStore';

// Type definitions for navigation
export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Game: {
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  };
  ScoreCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  useEffect(() => {
    // Initialize app config asynchronously without blocking rendering
    const initialize = async () => {
      try {
        await appConfigModule.initializeApp();
        console.log('App initialized');
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    // Fire and forget - don't wait
    initialize();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Start"
          component={StartScreenWrapper}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreenWrapper}
        />
        <Stack.Screen
          name="Game"
          component={GameScreenWrapper}
        />
        <Stack.Screen
          name="ScoreCard"
          component={ScoreCardScreenWrapper}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Screen wrapper components with navigation handlers

const StartScreenWrapper: React.FC<any> = ({ navigation }) => (
  <StartScreen
    onStart={() => {
      navigation.navigate('Home');
    }}
  />
);

const HomeScreenWrapper: React.FC<any> = ({ navigation }) => (
  <HomeScreen
    onSelectDifficulty={(difficulty: any) => {
      // Initialize game with selected difficulty
      appConfigModule.startNewGame(difficulty);
      navigation.navigate('Game', { difficulty });
    }}
    onSettings={() => {
      // Settings screen - to be implemented
      console.log('Settings button pressed');
    }}
  />
);

const GameScreenWrapper: React.FC<any> = ({ navigation, route }) => (
  <GameScreen
    difficulty={route.params?.difficulty || 'medium'}
    onGameWon={() => {
      navigation.navigate('ScoreCard');
    }}
    onBackHome={() => {
      navigation.navigate('Home');
    }}
  />
);

const ScoreCardScreenWrapper: React.FC<any> = ({ navigation }) => {
  const gameState = useGameStore((state) => ({
    grid: state.grid,
    moves: state.moves,
    time: state.time,
    score: state.score,
    hints: state.hints,
    isWon: state.isWon,
    isSolved: state.isSolved,
  }));

  return (
    <ScoreCardScreen
      gameState={gameState as any}
      levelMetadata={gameState.grid ? {
        id: gameState.grid.id,
        level: 1,
        difficulty: gameState.grid.difficulty,
        seed: gameState.grid.seed,
        generatedAt: Date.now(),
        statistics: {
          played: 1,
          won: 1,
          bestTime: gameState.time,
          bestScore: gameState.score,
          totalMoves: gameState.moves,
          abandons: 0,
          hintsUsed: gameState.hints.length,
        },
      } : undefined}
      onPlayAgain={() => {
        navigation.navigate('Home');
      }}
      onBackHome={() => {
        navigation.navigate('Home');
      }}
    />
  );
};
