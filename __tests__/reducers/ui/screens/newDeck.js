import {
  clearError,
  hideSubmitting,
  setError,
  setLastSubmittedId,
  showSubmitting,
} from '../../../../actions/ui/screens/newDeck';
import newDeck, {
  getInitialState,
} from '../../../../reducers/ui/screens/newDeck';

describe('reducers::ui::screens::newDeck', () => {
  test('initialState', () => {
    let state = newDeck(undefined, {});
    expect(state).toEqual(getInitialState());
  });

  test('showSubmitting', () => {
    let state = newDeck(undefined, showSubmitting());
    expect(state).toEqual({ ...getInitialState(), submitting: true });
  });

  test('hideSubmitting', () => {
    let state = newDeck(undefined, hideSubmitting());
    expect(state).toEqual({ ...getInitialState(), submitting: false });
  });

  test('setError', () => {
    let state = newDeck(undefined, setError('Ooops!'));
    expect(state).toEqual({ ...getInitialState(), errorMessage: 'Ooops!' });
  });

  test('clearError', () => {
    let state = newDeck(
      { ...getInitialState(), errorMessage: 'Ooops!' },
      clearError()
    );
    expect(state).toEqual({ ...getInitialState(), errorMessage: null });
  });

  test('setLastSubmittedId', () => {
    let state = newDeck(undefined, setLastSubmittedId('123'));
    expect(state).toEqual({
      ...getInitialState(),
      lastSubmittedId: '123',
    });
  });
});
