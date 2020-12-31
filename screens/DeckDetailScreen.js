import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeckDetail from '../components/decks/DeckDetail';

export default function DeckDetailScreen({ route }) {
  const deckId = route.params.deckId;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DeckDetail />
    </SafeAreaView>
  );
}
