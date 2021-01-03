import {
  clearSubmitGuessError,
  hideSubmittingGuess,
  setSubmitGuessError,
  showSubmittingGuess,
} from '../../../../actions/ui/screens/quiz';
import quiz, { getInitialState } from '../../../../reducers/ui/screens/quiz';

describe('reducers::ui::screens::quiz', () => {
  test('initialState', () => {
    let state = quiz(undefined, {});
    expect(state).toEqual(getInitialState());
  });

  test('showSubmittingGuess', () => {
    let state = quiz(undefined, showSubmittingGuess());
    expect(state).toEqual({ ...getInitialState(), submittingGuess: true });
  });

  test('hideSubmittingGuess', () => {
    let state = quiz(undefined, hideSubmittingGuess());
    expect(state).toEqual({ ...getInitialState(), submittingGuess: false });
  });

  test('setSubmitGuessError', () => {
    let state = quiz(undefined, setSubmitGuessError('Ooops!'));
    expect(state).toEqual({
      ...getInitialState(),
      submitGuessErrorMessage: 'Ooops!',
    });
  });

  test('clearSubmitGuessError', () => {
    let state = quiz(
      { ...getInitialState(), submitGuessErrorMessage: 'Ooops!' },
      clearSubmitGuessError()
    );
    expect(state).toEqual({
      ...getInitialState(),
      submitGuessErrorMessage: null,
    });
  });
});
