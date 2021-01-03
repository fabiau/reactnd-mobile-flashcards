import {
  clearSubmitGuessError,
  CLEAR_SUBMIT_GUESS_ERROR,
  hideSubmittingGuess,
  HIDE_SUBMITTING_GUESS,
  setSubmitGuessError,
  SET_SUBMIT_GUESS_ERROR,
  showSubmittingGuess,
  SHOW_SUBMITTING_GUESS,
} from '../../../../actions/ui/screens/quiz';

describe('actions::ui::screens::quiz', () => {
  test('showSubmittingGuess', () => {
    let action = showSubmittingGuess();
    expect(action).toEqual({
      type: SHOW_SUBMITTING_GUESS,
    });
  });

  test('hideSubmittingGuess', () => {
    let action = hideSubmittingGuess();
    expect(action).toEqual({
      type: HIDE_SUBMITTING_GUESS,
    });
  });

  test('setSubmitGuessError', () => {
    let action = setSubmitGuessError('some error');
    expect(action).toEqual({
      type: SET_SUBMIT_GUESS_ERROR,
      payload: 'some error',
    });
  });

  test('clearSubmitGuessError', () => {
    let action = clearSubmitGuessError();
    expect(action).toEqual({
      type: CLEAR_SUBMIT_GUESS_ERROR,
    });
  });
});
