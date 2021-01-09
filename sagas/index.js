import { all, call } from 'redux-saga/effects';
import { LocalNotifications } from '../constants/notifications';
import { watchAddCard } from './cards';
import { watchAddDeck } from './decks';
import { watchAddGuess } from './guesses';
import { setDailyNotification } from './notifications';
import { watchResetDeckQuiz } from './quiz';
import { hydrate } from './shared';
import uiRootSaga from './ui';

export function* setupNotifications() {
  yield call(setDailyNotification, LocalNotifications.QuizReminder);
}

export default function* rootSaga() {
  yield all([
    hydrate(),
    uiRootSaga(),
    watchAddDeck(),
    watchAddCard(),
    watchAddGuess(),
    watchResetDeckQuiz(),
    setupNotifications(),
  ]);
}
