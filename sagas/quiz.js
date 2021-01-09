import { call, cancel, put, select, takeEvery } from 'redux-saga/effects';
import { removeDeckGuesses } from '../actions/guesses';
import * as quizActions from '../actions/quiz';
import { guessesDbModel } from '../infra/db';
import { getDecks } from '../selectors/decks';
import { getGuesses } from '../selectors/guesses';

export function* handleResetDeckQuiz(action) {
  try {
    // TODO: put UI loading state for the specific deck id.

    const deckId = action.payload;
    const decksState = yield select(getDecks);
    if (!(deckId in decksState)) {
      // The deck is not in the store anymore, nothing to do
      // TODO: Notify the user
      yield cancel();
    }

    const deck = decksState[deckId];
    const guessesState = yield select(getGuesses);
    const cardsIds = deck.cards.reduce(
      (cardsIds, cardId) =>
        cardId in guessesState ? [...cardsIds, cardId] : cardsIds,
      []
    );

    if (cardsIds.length) {
      yield call(guessesDbModel.multiDelete, cardsIds);
      yield put(removeDeckGuesses(cardsIds));
    }
  } catch (error) {
    // TODO: Notify user of error
    console.error(error);
  } finally {
    // TODO: put UI loading state for the specific deck id.
    console.log('Done');
  }
}

export function* watchResetDeckQuiz() {
  yield takeEvery(quizActions.RESET_DECK_QUIZ, handleResetDeckQuiz);
}
