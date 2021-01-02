import { Appearance } from 'react-native';
import { channel, mock } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { setColorScheme } from '../../../actions/ui/theme';
import {
  appearanceChangeChannel,
  watchChangeColorScheme,
} from '../../../sagas/ui/theme';

describe('sagas::theme', () => {
  describe('watchChangeColorScheme', () => {
    let iterator = watchChangeColorScheme();

    it('starts with the current Appearance color scheme', () => {
      expect(iterator.next().value).toEqual(call(Appearance.getColorScheme));
      expect(iterator.next('dark').value).toEqual(put(setColorScheme('dark')));
    });

    it('then starts the channel to listen for appearance changes', () => {
      expect(iterator.next().value).toEqual(call(appearanceChangeChannel));
    });

    const mockChannel = channel();
    it('listens for changes and puts setColorScheme', () => {
      expect(iterator.next(mockChannel).value).toEqual(take(mockChannel));
      expect(iterator.next('dark').value).toEqual(put(setColorScheme('dark')));
    });
  });
});
