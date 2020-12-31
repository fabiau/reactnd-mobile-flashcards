import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeckList from '../components/decks/DeckList';

const decks = [
  {
    id: '1',
    title: '🌟 Astronomy',
    cards: Array(14).fill(null),
  },
  {
    id: '2',
    title: '🧑‍🎤 Songs',
    cards: Array(24).fill(null),
  },
];

export default function DecksScreen({ navigation }) {
  const handleDeckPress = (deck) =>
    navigation.navigate('DeckDetail', { deckId: deck.id });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Headline>My Decks</Headline>
        <DeckList
          style={styles.decks}
          decks={decks}
          onDeckPress={handleDeckPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  decks: {
    flex: 1,
    marginTop: 12,
  },
});
