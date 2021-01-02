import { setColorScheme, SET_COLOR_SCHEME } from '../../../actions/ui/theme';

describe('actions::theme', () => {
  test('setColorScheme', () => {
    let action = setColorScheme(null);
    expect(action).toEqual({
      type: SET_COLOR_SCHEME,
      payload: null,
    });

    action = setColorScheme('light');
    expect(action).toEqual({
      type: SET_COLOR_SCHEME,
      payload: 'light',
    });

    action = setColorScheme('dark');
    expect(action).toEqual({
      type: SET_COLOR_SCHEME,
      payload: 'dark',
    });
  });
});
