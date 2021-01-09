import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as guessesActions from '../actions/guesses';
import { getDecks } from '../selectors/decks';
import { cardsDbModel, guessesDbModel } from '../infra/db';
import { formatErrorMessage } from '../utils/helpers/errors';
import {
  clearSubmitGuessError,
  hideSubmittingGuess,
  setSubmitGuessError,
  showSubmittingGuess,
} from '../actions/ui/screens/quiz';
import { getCards } from '../selectors/cards';
import { getGuesses } from '../selectors/guesses';
import { rescheduleDailyNotification } from './notifications';

export function* isQuizComplete(cardSubmitted) {
  // TODO: Implement tests
  const guesses = yield select(getGuesses);
  const decks = yield select(getDecks);
  return (
    cardSubmitted.deckId in decks &&
    decks[cardSubmitted.deckId].cards.every((cardId) => cardId in guesses)
  );
}

export function* rescheduleQuizReminder() {
  yield call(rescheduleDailyNotification, {
    identifier: 'complete_quiz',
    content: {
      title: 'Quiz Reminder',
      body: "👋 Hey, don't forget to complete a quiz today",
    },
  });
}

export function* handleAddGuess(action) {
  yield put(showSubmittingGuess());
  yield put(clearSubmitGuessError());

  try {
    const cards = yield select(getCards);
    if (action.payload.id in cards) {
      const card = cards[action.payload.id];
      const timestamp = yield call(Date.now);

      let newModel = { ...action.payload, timestamp };
      newModel = yield call(guessesDbModel.add, newModel);

      yield put(guessesActions.addedGuess(newModel));

      if (yield call(isQuizComplete, card)) {
        yield call(rescheduleQuizReminder);
      }
    } else {
      yield put(
        setSubmitGuessError("Guess can't be submitted: card does not exist.")
      );
    }
  } catch (error) {
    yield put(setSubmitGuessError(formatErrorMessage(error)));
  } finally {
    yield put(hideSubmittingGuess());
  }
}

export function* watchAddGuess() {
  yield takeLeading(guessesActions.ADD_GUESS, handleAddGuess);
}
