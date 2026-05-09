import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../ui/screens/LandingScreen';
import { GameScreen } from '../ui/screens/GameScreen';
import ProfileScreen from '../ui/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;