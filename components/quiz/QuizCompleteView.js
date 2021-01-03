import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import TrophyWinnersImage from '../../assets/illustrations/trophy_winners.svg';

export default function QuizCompleteView({ score, onGoBack, onRestartQuiz }) {
  return (
    <View style={styles.container}>
      <Title style={styles.left}>Quiz Complete</Title>

      <TrophyWinnersImage width={300} height={200} />
      <Headline>Congratulations!</Headline>
      <Subheading>
        {score.answeredCorrectCount} out of {score.totalQuestions} correct
        answers
      </Subheading>

      <View style={styles.actions}>
        <Button
          onPress={onGoBack}
          mode="outlined"
          icon={(props) => <Ionicons name="md-arrow-back" {...props} />}
        >
          Go Back
        </Button>
        <Button
          onPress={onRestartQuiz}
          style={styles.restartBtn}
          mode="contained"
          icon={(props) => <Ionicons name="md-refresh" {...props} />}
        >
          Restart Quiz
        </Button>
      </View>
    </View>
  );
}

QuizCompleteView.propTypes = {
  score: PropTypes.shape({
    answeredCorrectCount: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
  }).isRequired,
  onGoBack: PropTypes.func.isRequired,
  onRestartQuiz: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  left: {
    alignSelf: 'flex-start',
  },
  actions: {
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  restartBtn: {
    marginTop: 8,
  },
});
