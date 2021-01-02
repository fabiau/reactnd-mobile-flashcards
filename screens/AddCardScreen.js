import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCard } from '../actions/cards';
import { clearError } from '../actions/ui/screens/addCard';
import AddCardForm from '../components/cards/AddCardForm';
import ErrorSnackbar from '../components/shared/snackbars/ErrorSnackbar';
import { getDeckById } from '../selectors/decks';
import { getAddCardScreenState } from '../selectors/ui/screens/addCard';

class AddCardScreen extends Component {
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
      !this.props.errorMessage
    ) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { deck, errorMessage, submitting, addCard, clearError } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title>Add to {deck.title}</Title>
          {this.state.visible && (
            <AddCardForm
              style={styles.form}
              submitting={submitting}
              onSubmit={(values) => addCard({ deckId: deck.id, ...values })}
            />
          )}

          <ErrorSnackbar errorMessage={errorMessage} onDismiss={clearError} />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    deck: getDeckById(state, { deckId: ownProps.route.params.deckId }),
    ...getAddCardScreenState(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCard, clearError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen);

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
