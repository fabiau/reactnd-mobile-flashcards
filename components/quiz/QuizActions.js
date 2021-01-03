import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import QuizGuess from './QuizGuess';

export default function QuizActions({
  theme,
  showAnswer,
  onToggleAnswer,
  onSubmitGuess,
}) {
  return (
    <View style={styles.container}>
      <QuizGuess visible={showAnswer} onSubmit={onSubmitGuess} />

      <Button onPress={onToggleAnswer} mode="contained">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </Button>
    </View>
  );
}

QuizActions.propTypes = {
  showAnswer: PropTypes.bool.isRequired,
  onToggleAnswer: PropTypes.func.isRequired,
  onSubmitGuess: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
