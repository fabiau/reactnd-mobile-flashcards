import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CreateScreen from '../screens/CreateScreen';
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
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="add-circle" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
