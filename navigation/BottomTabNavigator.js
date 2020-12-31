import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewDeckScreen from '../screens/NewDeckScreen';
import DecksScreen from '../screens/DecksScreen';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Decks"
        component={DecksScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="file-tray-stacked" size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="NewDeck"
        component={NewDeckScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="add-circle" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
