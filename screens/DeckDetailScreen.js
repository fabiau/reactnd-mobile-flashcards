import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import DeckDetail from '../components/decks/DeckDetail';
import { getDeckById } from '../selectors/decks';

function DeckDetailScreen({ route, navigation, deck }) {
  const deckId = route.params.deckId;
  const handleAddQuestionPress = () => {
    navigation.navigate('AddQuestion', { deckId });
  };

  const handleStarQuizPress = () => {
    navigation.navigate('QuestionsQuiz', { deckId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DeckDetail
        deck={deck}
        onAddQuestionPress={handleAddQuestionPress}
        onStartQuizPress={handleStarQuizPress}
      />
    </SafeAreaView>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    deck: getDeckById(state, { deckId: ownProps.route.params.deckId }),
  };
}

export default connect(mapStateToProps)(DeckDetailScreen);
