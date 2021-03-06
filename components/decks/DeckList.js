import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import DeckType from '../shared/prop-types/DeckType';

function renderItem({ deck, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Card style={styles.card}>
        <Card.Title title={deck.title} subtitle={deck.cardCountLabel} />
      </Card>
    </TouchableNativeFeedback>
  );
}

function extractKey(deck) {
  return deck.id;
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
  decks: PropTypes.arrayOf(DeckType.isRequired).isRequired,
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
