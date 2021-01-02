import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/decks';
import { clearError } from '../actions/ui/screens/newDeck';
import NewDeckForm from '../components/decks/NewDeckForm';
import ErrorSnackbar from '../components/shared/snackbars/ErrorSnackbar';
import { getNewDeckScreenState } from '../selectors/ui/screens/newDeck';

class NewDeckScreen extends Component {
  state = {
    unsubscribe: null,
    visible: false,
  };

  componentDidMount() {
    const focusUnsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState(() => ({
        visible: true,
      }));
    });

    const blurUnsubscribe = this.props.navigation.addListener('blur', () => {
      this.props.clearError();
      this.setState(() => ({
        visible: false,
      }));
    });

    this.setState(() => ({
      unsubscribe: () => {
        focusUnsubscribe();
        blurUnsubscribe();
      },
    }));
  }

  componentWillUnmount() {
    this.state.unsubscribe?.();
  }

  componentDidUpdate(prevProps) {
    // Check if it completed the submit action
    if (
      prevProps.submitting === true &&
      this.props.submitting === false &&
      !this.props.errorMessage &&
      this.props.lastSubmittedId
    ) {
      this.props.navigation.navigate('DeckDetail', {
        deckId: this.props.lastSubmittedId,
      });
    }
  }

  render() {
    const { errorMessage, submitting, addDeck, clearError } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Headline>New Deck</Headline>
          {this.state.visible && (
            <NewDeckForm
              style={styles.form}
              submitting={submitting}
              onSubmit={(values) => addDeck(values)}
            />
          )}

          <ErrorSnackbar errorMessage={errorMessage} onDismiss={clearError} />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return getNewDeckScreenState(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addDeck, clearError }, dispatch);
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
