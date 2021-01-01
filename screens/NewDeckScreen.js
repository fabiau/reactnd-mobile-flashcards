import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/decks';
import NewDeckForm from '../components/decks/NewDeckForm';
import createErrorSnackbarContainer from '../components/shared/ErrorSnackbarContainer';
import UIStateKeys from '../constants/UIStateKeys';
import { getErrorByKey, getLoaderByKey } from '../selectors/ui';

const ErrorSnackbarContainer = createErrorSnackbarContainer(
  UIStateKeys.NewDeck
);

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
      prevProps.loading === true &&
      this.props.loading === false &&
      !this.props.error
    ) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { error, loading, addDeck } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Headline>New Deck</Headline>
          {this.state.visible && (
            <NewDeckForm
              style={styles.form}
              loading={loading}
              onSubmit={(values) => addDeck(values)}
            />
          )}

          <ErrorSnackbarContainer />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: getErrorByKey(state, { key: UIStateKeys.NewDeck }),
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
