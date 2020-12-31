import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeckDetail from '../components/decks/DeckDetail';

export default function DeckDetailScreen({ route, navigation }) {
  const deckId = route.params.deckId;
  const handleQuestionCardPress = () => {
    navigation.navigate('AddQuestion', { deckId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DeckDetail onAddQuestionPress={handleQuestionCardPress} />
    </SafeAreaView>
  );
}
