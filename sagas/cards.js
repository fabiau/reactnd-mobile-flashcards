import { call, put, select, takeLeading } from 'redux-saga/effects';
import * as cardsActions from '../actions/cards';
import * as decksActions from '../actions/decks';
import {
  clearError,
  hideSubmitting,
  setError,
  showSubmitting,
} from '../actions/ui/screens/addCard';
import { getDecks } from '../selectors/decks';
import { cardsDbModel, decksDbModel } from '../infra/db';
import { formatErrorMessage } from '../utils/helpers/errors';

export function* handleAddCard(action) {
  yield put(showSubmitting());
  yield put(clearError());

  try {
    const decks = yield select(getDecks);
    if (action.payload.deckId in decks) {
      const deck = decks[action.payload.deckId];
      const timestamp = yield call(Date.now);

      let newModel = { ...action.payload, timestamp };
      newModel = yield call(cardsDbModel.add, newModel);

      yield call(decksDbModel.patch, {
        ...deck,
        cards: [...deck.cards, newModel.id],
      });

      yield put(cardsActions.addedCard(newModel));
      yield put(
        decksActions.addedDeckCard({
          id: deck.id,
          card: newModel.id,
        })
      );
    } else {
      yield put(setError("Card can't be added: deck does not exist."));
    }
  } catch (error) {
    yield put(setError(formatErrorMessage(error)));
  } finally {
    yield put(hideSubmitting());
  }
}

export function* watchAddCard() {
  yield takeLeading(cardsActions.ADD_CARD, handleAddCard);
}
