import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Card, Title } from 'react-native-paper';

function renderItem({ deck, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Card style={styles.card}>
        <Card.Title
          title={deck.title}
          subtitle={`${deck.cards.length} Cards`}
        />
      </Card>
    </TouchableNativeFeedback>
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

export default function DeckList({ decks, onDeckPress, style }) {
  if (!decks.length) {
    return renderEmpty();
  }

  return (
    <FlatList
      style={style}
      data={decks}
      renderItem={({ item }) =>
        renderItem({ deck: item, onPress: () => onDeckPress(item) })
      }
      keyExtractor={extractKey}
    />
  );
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
  onDeckPress: PropTypes.func.isRequired,
};

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
