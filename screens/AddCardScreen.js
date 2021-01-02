import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import AddCardForm from '../components/cards/AddCardForm';
import { getDeckById } from '../selectors/decks';

function AddCardScreen({ route, deck }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title>Add to {deck.title}</Title>
        <AddCardForm
          style={styles.form}
          onSubmit={() => console.log('Submitted!')}
        />
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    deck: getDeckById(state, { deckId: ownProps.route.params.deckId }),
  };
}

export default connect(mapStateToProps)(AddCardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  form: {
    flex: 1,
    marginTop: 32,
  },
});
