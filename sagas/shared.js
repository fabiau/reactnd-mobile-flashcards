import { all, call, put } from 'redux-saga/effects';
import * as SplashScreen from 'expo-splash-screen';
import { decksDbModel } from '../infra/db';
import { hydrateDecks } from '../actions/decks';

export function* hydrate() {
  yield call(SplashScreen.preventAutoHideAsync);

  try {
    const [decks] = yield all([call(decksDbModel.getAll)]);
    if (decks && typeof decks === 'object') {
      yield put(hydrateDecks(decks));
    }
  } finally {
    yield call(SplashScreen.hideAsync);
  }
}
