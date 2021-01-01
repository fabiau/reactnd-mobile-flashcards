import { all } from 'redux-saga/effects';
import { watchAddDeck } from './decks';
import { watchChangeColorScheme } from './theme';

export default function* rootSaga() {
  yield all([watchChangeColorScheme(), watchAddDeck()]);
}
