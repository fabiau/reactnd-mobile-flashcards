import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import QuizView from '../components/quiz/QuizView';
import { getDeckById } from '../selectors/decks';

function QuizScreen({ deck }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title>{deck.title}</Title>
        <QuizView deck={deck} style={styles.quiz} />
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    deck: getDeckById(state, { deckId: ownProps.route.params.deckId }),
  };
}

export default connect(mapStateToProps)(QuizScreen);

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
