import { setLoader, SET_LOADER } from '../../../actions/ui/loaders';
import UIStateKeys from '../../../constants/UIStateKeys';

describe('actions::ui::loaders', () => {
  test('setLoader', () => {
    let action = setLoader({ key: UIStateKeys.NewDeck, value: false });
    expect(action).toEqual({
      type: SET_LOADER,
      payload: {
        key: UIStateKeys.NewDeck,
        value: false,
      },
    });

    action = setLoader({ key: UIStateKeys.NewDeck, value: true });
    expect(action).toEqual({
      type: SET_LOADER,
      payload: {
        key: UIStateKeys.NewDeck,
        value: true,
      },
    });
  });
});
