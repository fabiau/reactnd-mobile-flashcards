import { setColorScheme } from '../../actions/theme';
import theme from '../../reducers/theme';

describe('reducers::theme', () => {
  test('setColorScheme', () => {
    let state = theme(undefined, {});
    expect(state).toEqual({ colorScheme: null });

    state = theme(state, setColorScheme('light'));
    expect(state).toEqual({ colorScheme: 'light' });

    state = theme(state, setColorScheme('dark'));
    expect(state).toEqual({ colorScheme: 'dark' });

    state = theme(state, setColorScheme(null));
    expect(state).toEqual({ colorScheme: null });
  });
});