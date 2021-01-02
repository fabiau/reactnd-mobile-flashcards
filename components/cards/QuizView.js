import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Caption,
  Paragraph,
  RadioButton,
  Subheading,
  withTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import QuizCard from './QuizCard';

class QuizView extends Component {
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
        <View>
          <QuizCard ref={(current) => (this.current = current)} />
        </View>

        <View style={styles.bottom}>
          <Button onPress={this.toggleFlip} mode="contained">
            {flipped ? 'Hide Answer' : 'Show Answer'}
          </Button>

          <View style={styles.guessContainer}>
            <Subheading>My guess was:</Subheading>
            <View style={styles.guessActions}>
              <Button
                mode="outlined"
                color={theme.colors.success}
                style={[
                  styles.guessButton,
                  { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                ]}
                icon={(props) => <Ionicons name="checkmark" {...props} />}
              >
                Correct
              </Button>
              <Button
                mode="outlined"
                color={theme.colors.danger}
                style={[
                  styles.guessButton,
                  { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                ]}
                icon={(props) => <Ionicons name="close" {...props} />}
              >
                Incorrect
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(QuizView);

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  guessContainer: {
    marginTop: 16,
  },
  guessActions: {
    marginTop: 8,
    flexDirection: 'row',
  },
  guessButton: {
    flex: 1,
  },
});
