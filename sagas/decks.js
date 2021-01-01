import { call, put, takeEvery } from 'redux-saga/effects';
import * as decksActions from '../actions/decks';
import { decksDbModel } from '../infra/db';

export function* handleAddDeck(action) {
  try {
    let newModel = { ...action.payload, questions: [] };
    console.log(decksDbModel);
    newModel = yield call(decksDbModel.add, newModel);
    yield put(decksActions.addedDeck(newModel));
    // TODO: Navigate
  } catch (err) {
    console.error(err);
    // TODO: Notify the user
  }
}

export function* watchAddDeck() {
  yield takeEvery(decksActions.ADD_DECK, handleAddDeck);
}
