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

export function* handleAddGuess(action) {
  yield put(showSubmittingGuess());
  yield put(clearSubmitGuessError());

  try {
    const cards = yield select(getCards);
    if (action.payload.id in cards) {
      const timestamp = yield call(Date.now);

      let newModel = { ...action.payload, timestamp };
      newModel = yield call(guessesDbModel.add, newModel);

      yield put(guessesActions.addedGuess(newModel));
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
