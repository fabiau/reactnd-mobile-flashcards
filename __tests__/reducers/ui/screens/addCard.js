import {
  clearError,
  hideSubmitting,
  setError,
  showSubmitting,
} from '../../../../actions/ui/screens/addCard';
import addCard, {
  getInitialState,
} from '../../../../reducers/ui/screens/addCard';

describe('reducers::ui::screens::addCard', () => {
  test('initialState', () => {
    let state = addCard(undefined, {});
    expect(state).toEqual(getInitialState());
  });

  test('showSubmitting', () => {
    let state = addCard(undefined, showSubmitting());
    expect(state).toEqual({ ...getInitialState(), submitting: true });
  });

  test('hideSubmitting', () => {
    let state = addCard(undefined, hideSubmitting());
    expect(state).toEqual({ ...getInitialState(), submitting: false });
  });

  test('setError', () => {
    let state = addCard(undefined, setError('Ooops!'));
    expect(state).toEqual({ ...getInitialState(), errorMessage: 'Ooops!' });
  });

  test('clearError', () => {
    let state = addCard(
      { ...getInitialState(), errorMessage: 'Ooops!' },
      clearError()
    );
    expect(state).toEqual({ ...getInitialState(), errorMessage: null });
  });
});
