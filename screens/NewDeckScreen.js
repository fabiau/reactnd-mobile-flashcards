import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/decks';
import NewDeckForm from '../components/decks/NewDeckForm';

function NewDeckScreen({ addDeck }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Headline>New Deck</Headline>
        <NewDeckForm
          style={styles.form}
          onSubmit={(values) => addDeck(values)}
        />
      </View>
    </SafeAreaView>
  );
}

export default connect(null, mapDispatchToProps)(NewDeckScreen);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addDeck }, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 1,
    marginTop: 32,
  },
});
