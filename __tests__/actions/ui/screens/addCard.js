import {
  clearError,
  CLEAR_ERROR,
  hideSubmitting,
  HIDE_SUBMITTING,
  setError,
  SET_ERROR,
  showSubmitting,
  SHOW_SUBMITTING,
} from '../../../../actions/ui/screens/addCard';

describe('actions::ui::screens::addCard', () => {
  test('showSubmitting', () => {
    let action = showSubmitting();
    expect(action).toEqual({
      type: SHOW_SUBMITTING,
    });
  });

  test('hideSubmitting', () => {
    let action = hideSubmitting();
    expect(action).toEqual({
      type: HIDE_SUBMITTING,
    });
  });

  test('setError', () => {
    let action = setError('some error');
    expect(action).toEqual({
      type: SET_ERROR,
      payload: 'some error',
    });
  });

  test('clearError', () => {
    let action = clearError();
    expect(action).toEqual({
      type: CLEAR_ERROR,
    });
  });
});
