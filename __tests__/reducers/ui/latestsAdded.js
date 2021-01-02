import { setLoader } from '../../../actions/ui/loaders';
import UIStateKeys from '../../../constants/UIStateKeys';
import loaders from '../../../reducers/ui/loaders';

describe('reducers::ui::latestsAdded', () => {
  test('setLatestAdded', () => {
    let state = loaders(undefined, {});
    expect(state).toEqual({});

    state = loaders(
      state,
      setLoader({ key: UIStateKeys.NewDeck, value: '12343' })
    );
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: '12343',
    });

    state = loaders(
      state,
      setLoader({ key: UIStateKeys.NewDeck, value: null })
    );
    expect(state).toEqual({
      [UIStateKeys.NewDeck]: null,
    });
  });
});
