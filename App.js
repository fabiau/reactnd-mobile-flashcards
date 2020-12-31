import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { AppPaperThemeProvider } from './theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppPaperThemeProvider>
        <Navigation />
        <StatusBar style="light" />
      </AppPaperThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
