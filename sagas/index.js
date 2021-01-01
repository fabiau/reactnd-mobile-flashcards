import { all } from 'redux-saga/effects';
import { watchAddDeck } from './decks';
import { hydrate } from './shared';
import { watchChangeColorScheme } from './theme';

export default function* rootSaga() {
  yield all([hydrate(), watchChangeColorScheme(), watchAddDeck()]);
}
