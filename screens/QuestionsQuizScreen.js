import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCardForm from '../components/questions/AddQuestionForm';
import QuestionsQuiz from '../components/questions/QuestionsQuiz';

export default function QuestionsQuizScreen({ route }) {
  const deckId = route.params.deckId;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title>🌟 Astronomy</Title>
        <QuestionsQuiz style={styles.quiz} />
      </View>
    </SafeAreaView>
  );
}

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