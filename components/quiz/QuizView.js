import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import QuizCard from './QuizCard';
import QuizActions from './QuizActions';
import DeckType from '../shared/prop-types/DeckType';

class QuizView extends Component {
  static propTypes = {
    deck: DeckType.isRequired,
  };

  state = {
    flipped: false,
  };

  constructor(props) {
    super(props);
    this.current = null;
  }

  toggleFlip = () => {
    if (this.current != null) {
      this.setState((prevState) => ({ flipped: !prevState.flipped }));
      this.current.flipCard();
    }
  };

  handleGuessCheck = (guess) => {
    this.setState(() => ({ guess }));
  };

  render() {
    const { flipped, guess } = this.state;
    const { theme } = this.props;

    return (
      <View style={this.props.style}>
        <Caption>14 cards remaining</Caption>
        <QuizCard ref={(current) => (this.current = current)} />
        <QuizActions showAnswer={flipped} onToggleAnswer={this.toggleFlip} />
      </View>
    );
  }
}

export default QuizView;
