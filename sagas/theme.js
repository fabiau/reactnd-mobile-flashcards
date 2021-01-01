import { Appearance } from 'react-native';
import { eventChannel } from 'redux-saga';
import { call, cancelled, put, take } from 'redux-saga/effects';
import { setColorScheme } from '../actions/theme';

export function appearanceChangeChannel() {
  return eventChannel((emit) => {
    const listener = ({ colorScheme }) => {
      emit(colorScheme);
    };

    Appearance.addChangeListener(listener);
    return () => {
      Appearance.removeChangeListener(listener);
    };
  });
}

export function* watchChangeColorScheme() {
  let colorScheme = yield call(Appearance.getColorScheme);
  yield put(setColorScheme(colorScheme));

  const chan = yield call(appearanceChangeChannel);
  try {
    while (true) {
      colorScheme = yield take(chan);
      yield put(setColorScheme(colorScheme));
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}
