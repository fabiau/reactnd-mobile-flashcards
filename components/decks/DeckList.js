import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';

function renderItem({ item: deck }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={deck.title} subtitle={`${deck.cards.length} Cards`} />
    </Card>
  );
}

function extractKey(deck) {
  return deck.key;
}

function renderEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <Title style={styles.emptyText}>No Decks Yet</Title>
    </View>
  );
}

export default function DeckList({ decks, style }) {
  if (!decks.length) {
    return renderEmpty();
  }

  return (
    <FlatList
      style={style}
      data={decks}
      renderItem={renderItem}
      keyExtractor={extractKey}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
