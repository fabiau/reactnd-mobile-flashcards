import { all } from 'redux-saga/effects';
import { watchAddCard } from './cards';
import { watchAddDeck } from './decks';
import { hydrate } from './shared';
import uiRootSaga from './ui';

export default function* rootSaga() {
  yield all([hydrate(), uiRootSaga(), watchAddDeck(), watchAddCard()]);
}
