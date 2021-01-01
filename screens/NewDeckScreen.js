import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/decks';
import NewDeckForm from '../components/decks/NewDeckForm';
import createErrorSnackbarContainer from '../components/shared/ErrorSnackbarContainer';
import UIStateKeys from '../constants/UIStateKeys';
import { getLoaderByKey } from '../selectors/ui';

const ErrorSnackbarContainer = createErrorSnackbarContainer(
  UIStateKeys.NewDeck
);

function NewDeckScreen({ error, loading, addDeck }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Headline>New Deck</Headline>
        <NewDeckForm
          style={styles.form}
          loading={loading}
          onSubmit={(values) => addDeck(values)}
        />

        <ErrorSnackbarContainer />
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    loading: getLoaderByKey(state, { key: UIStateKeys.NewDeck }),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen);

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
