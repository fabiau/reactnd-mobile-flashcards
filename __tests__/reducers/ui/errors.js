import { setError } from '../../../actions/ui/errors';
import UIStateKeys from '../../../constants/UIStateKeys';
import errors from '../../../reducers/ui/errors';

describe('reducers::ui::errors', () => {
  test('setError', () => {
    let state = errors(undefined, {});
    expect(state).toEqual({});

    state = errors(state, setError({ key: UIStateKeys.NewDeck, value: null }));
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: null,
    });

    state = errors(
      state,
      setError({ key: UIStateKeys.NewDeck, value: 'someError' })
    );
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: 'someError',
    });
  });
});
