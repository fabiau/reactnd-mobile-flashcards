import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import * as decksActions from '../actions/decks';
import { setError } from '../actions/ui/errors';
import { setLoader } from '../actions/ui/loaders';
import UIStateKeys from '../constants/UIStateKeys';
import { decksDbModel } from '../infra/db';
import { formatErrorMessage } from '../utils/helpers/errors';

export function* handleAddDeck(action) {
  yield put(setLoader({ key: UIStateKeys.NewDeck, value: true }));
  yield put(setError({ key: UIStateKeys.NewDeck, value: null }));

  try {
    const timestamp = yield call(Date.now);
    let newModel = { ...action.payload, timestamp, questions: [] };
    newModel = yield call(decksDbModel.add, newModel);
    yield put(decksActions.addedDeck(newModel));
    // TODO: Navigate
  } catch (error) {
    yield put(
      setError({ key: UIStateKeys.NewDeck, value: formatErrorMessage(error) })
    );
  } finally {
    yield put(setLoader({ key: UIStateKeys.NewDeck, value: false }));
  }
}

export function* watchAddDeck() {
  yield takeLeading(decksActions.ADD_DECK, handleAddDeck);
}
