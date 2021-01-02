import {
  setLatestAdded,
  SET_LATEST_ADDED,
} from '../../../actions/ui/latestsAdded';
import UIStateKeys from '../../../constants/UIStateKeys';

describe('actions::ui::latestsAdded', () => {
  test('setLatestAdded', () => {
    let action = setLatestAdded({ key: UIStateKeys.NewDeck, value: '1234' });
    expect(action).toEqual({
      type: SET_LATEST_ADDED,
      payload: {
        key: UIStateKeys.NewDeck,
        value: '1234',
      },
    });

    action = setLatestAdded({ key: UIStateKeys.NewDeck, value: null });
    expect(action).toEqual({
      type: SET_LATEST_ADDED,
      payload: {
        key: UIStateKeys.NewDeck,
        value: null,
      },
    });
  });
});
