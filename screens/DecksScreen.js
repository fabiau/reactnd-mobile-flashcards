import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import DeckList from '../components/decks/DeckList';
import { getDecksDisplayList } from '../selectors/decks';

function DecksScreen({ navigation, decks }) {
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

function mapStateToProps(state) {
  return {
    decks: getDecksDisplayList(state),
  };
}

export default connect(mapStateToProps)(DecksScreen);

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
