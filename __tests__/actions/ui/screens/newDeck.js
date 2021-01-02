import {
  clearError,
  CLEAR_ERROR,
  hideSubmitting,
  HIDE_SUBMITTING,
  setError,
  setLastSubmittedId,
  SET_ERROR,
  SET_LAST_SUBMITTED_ID,
  showSubmitting,
  SHOW_SUBMITTING,
} from '../../../../actions/ui/screens/newDeck';

describe('actions::ui::screens::newDeck', () => {
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

  test('setLastSubmittedId', () => {
    let action = setLastSubmittedId('123456');
    expect(action).toEqual({
      type: SET_LAST_SUBMITTED_ID,
      payload: '123456',
    });
  });
});
