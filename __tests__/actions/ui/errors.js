import { setError, SET_ERROR } from '../../../actions/ui/errors';
import UIStateKeys from '../../../constants/UIStateKeys';

describe('actions::ui::errors', () => {
  test('setError', () => {
    let action = setError({ key: UIStateKeys.NewDeck, value: null });
    expect(action).toEqual({
      type: SET_ERROR,
      payload: {
        key: UIStateKeys.NewDeck,
        value: null,
      },
    });

    action = setError({ key: UIStateKeys.NewDeck, value: 'someError' });
    expect(action).toEqual({
      type: SET_ERROR,
      payload: {
        key: UIStateKeys.NewDeck,
        value: 'someError',
      },
    });
  });
});
