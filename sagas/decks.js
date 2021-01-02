import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import * as decksActions from '../actions/decks';
import {
  clearError,
  hideSubmitting,
  setError,
  setLastSubmittedId,
  showSubmitting,
} from '../actions/ui/screens/newDeck';
import { decksDbModel } from '../infra/db';
import { formatErrorMessage } from '../utils/helpers/errors';

export function* handleAddDeck(action) {
  yield put(showSubmitting());
  yield put(clearError());

  try {
    const timestamp = yield call(Date.now);
    let newModel = { ...action.payload, timestamp, cards: [] };
    newModel = yield call(decksDbModel.add, newModel);

    yield put(decksActions.addedDeck(newModel));
    yield put(setLastSubmittedId(newModel.id));
  } catch (error) {
    yield put(setError(formatErrorMessage(error)));
  } finally {
    yield put(hideSubmitting());
  }
}

export function* watchAddDeck() {
  yield takeLeading(decksActions.ADD_DECK, handleAddDeck);
}
