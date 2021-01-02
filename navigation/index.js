import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';
import BottomTabNavigator from './BottomTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddCardScreen from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';

function Navigation({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default withTheme(Navigation);

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Root"
        component={BottomTabNavigator}
      />

      <Stack.Screen
        name="DeckDetail"
        component={DeckDetailScreen}
        options={{ title: 'Deck Detail' }}
      />

      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: 'Add Card' }}
      />

      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
