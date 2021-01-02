import { all } from 'redux-saga/effects';
import { watchChangeColorScheme } from './theme';

export default function* uiRootSaga() {
  yield all([watchChangeColorScheme()]);
}
