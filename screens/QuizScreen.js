import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addGuess } from '../actions/guesses';
import QuizView from '../components/quiz/QuizView';
import { getDeckById } from '../selectors/decks';
import { getQuizRemainingCards } from '../selectors/ui/screens/quiz';

class QuizScreen extends Component {
  handleSubmitGuess = (card, correct) => {
    this.props.addGuess({ cardId: card.id, correct });
  };

  render() {
    const { deck, remainingCards } = this.props;
    if (remainingCards.error) {
      return null; // <ErrorView />
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title>{deck.title}</Title>
          <QuizView
            style={styles.quiz}
            remainingCards={remainingCards.data}
            onSubmitGuess={this.handleSubmitGuess}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const getDeckIdProps = { deckId: ownProps.route.params.deckId };

  return {
    deck: getDeckById(state, getDeckIdProps),
    remainingCards: getQuizRemainingCards(state, getDeckIdProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addGuess }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  quiz: {
    flex: 1,
    marginTop: 32,
  },
});
