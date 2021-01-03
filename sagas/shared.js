import { all, call, put } from 'redux-saga/effects';
import * as SplashScreen from 'expo-splash-screen';
import { cardsDbModel, decksDbModel, guessesDbModel } from '../infra/db';
import { hydrateDecks } from '../actions/decks';
import { hydrateCards } from '../actions/cards';
import { hydrateGuesses } from '../actions/guesses';

export function* hydrate() {
  yield call(SplashScreen.preventAutoHideAsync);

  try {
    const [decks, cards, guesses] = yield all([
      call(decksDbModel.getAll),
      call(cardsDbModel.getAll),
      call(guessesDbModel.getAll),
    ]);

    if (decks && typeof decks === 'object') {
      yield put(hydrateDecks(decks));
    }
    if (cards && typeof cards === 'object') {
      yield put(hydrateCards(cards));
    }
    if (guesses && typeof guesses === 'object') {
      yield put(hydrateGuesses(guesses));
    }
  } finally {
    yield call(SplashScreen.hideAsync);
  }
}
