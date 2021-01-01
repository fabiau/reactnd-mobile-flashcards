import { setLoader } from '../../../actions/ui/loaders';
import UIStateKeys from '../../../constants/UIStateKeys';
import loaders from '../../../reducers/ui/loaders';

describe('reducers::ui::loaders', () => {
  test('setLoader', () => {
    let state = loaders(undefined, {});
    expect(state).toEqual({});

    state = loaders(
      state,
      setLoader({ key: UIStateKeys.NewDeck, value: false })
    );
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: false,
    });

    state = loaders(
      state,
      setLoader({ key: UIStateKeys.NewDeck, value: true })
    );
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: true,
    });
  });
});
