import { all } from 'redux-saga/effects';
import { watchChangeColorScheme } from './theme';

export default function* rootSaga() {
  yield all([watchChangeColorScheme()]);
}
