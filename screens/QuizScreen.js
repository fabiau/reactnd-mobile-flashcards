import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addGuess } from '../actions/guesses';
import { resetDeckQuiz } from '../actions/quiz';
import QuizCompleteView from '../components/quiz/QuizCompleteView';
import QuizView from '../components/quiz/QuizView';
import { getDeckById } from '../selectors/decks';
import {
  getQuizProgress,
  getQuizRemainingCards,
} from '../selectors/ui/screens/quiz';

class QuizScreen extends Component {
  handleSubmitGuess = (card, correct) => {
    this.props.addGuess({ cardId: card.id, correct });
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handleRestarQuiz = () => {
    this.props.resetDeckQuiz(this.props.deck.id);
  };

  render() {
    const { deck, remainingCards, progress } = this.props;
    if (remainingCards.errorMessage) {
      return null; // <ErrorView />
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title>{deck.title}</Title>

          {remainingCards.data.length ? (
            <QuizView
              style={styles.quiz}
              remainingCards={remainingCards.data}
              onSubmitGuess={this.handleSubmitGuess}
            />
          ) : (
            <QuizCompleteView
              score={progress}
              onGoBack={this.handleGoBack}
              onRestartQuiz={this.handleRestarQuiz}
            />
          )}
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
    progress: getQuizProgress(state, getDeckIdProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addGuess, resetDeckQuiz }, dispatch);
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
