import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import DeckDetail from '../components/decks/DeckDetail';
import { getDeckById } from '../selectors/decks';
import { getQuizProgress } from '../selectors/ui/screens/quiz';

function DeckDetailScreen({ route, navigation, deck, quizProgress }) {
  const deckId = route.params.deckId;
  const handleAddCardPress = () => {
    navigation.navigate('AddCard', { deckId });
  };

  const handleStarQuizPress = () => {
    navigation.navigate('Quiz', { deckId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DeckDetail
        deck={deck}
        quizProgress={quizProgress}
        onAddCardPress={handleAddCardPress}
        onStartQuizPress={handleStarQuizPress}
      />
    </SafeAreaView>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    deck: getDeckById(state, { deckId: ownProps.route.params.deckId }),
    quizProgress: getQuizProgress(state, {
      deckId: ownProps.route.params.deckId,
    }),
  };
}

export default connect(mapStateToProps)(DeckDetailScreen);
