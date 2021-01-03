import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import QuizCard from './QuizCard';
import QuizActions from './QuizActions';
import DeckType from '../shared/prop-types/DeckType';
import CardType from '../shared/prop-types/CardType';

export default class QuizView extends Component {
  static propTypes = {
    remainingCards: PropTypes.arrayOf(CardType.isRequired).isRequired,
    onSubmitGuess: PropTypes.func.isRequired,
  };

  state = {
    flipped: false,
  };

  constructor(props) {
    super(props);
    this.currentCardView = React.createRef();
  }

  getCurrentCard = () => {
    return this.props.remainingCards[0];
  };

  toggleFlip = () => {
    if (this.currentCardView.current) {
      this.setState((prevState) => ({ flipped: !prevState.flipped }));
      this.currentCardView.current.flipCard();
    }
  };

  handleGuessCheck = (guess) => {
    this.setState(() => ({ guess }));
  };

  handleSubmitGuess = (correct) => {
    this.props.onSubmitGuess(this.getCurrentCard(), correct);
  };

  render() {
    const { flipped, guess } = this.state;
    const { remainingCards } = this.props;
    const currentCard = this.getCurrentCard();

    if (!currentCard) {
      return null; // <QuizCompleteView />
    }

    return (
      <View style={this.props.style}>
        <Caption>{remainingCards.length} cards remaining</Caption>
        <QuizCard card={currentCard} ref={this.currentCardView} />
        <QuizActions
          showAnswer={flipped}
          onToggleAnswer={this.toggleFlip}
          onSubmitGuess={this.handleSubmitGuess}
        />
      </View>
    );
  }
}
