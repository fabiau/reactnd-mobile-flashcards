export const SHOW_SUBMITTING_GUESS = 'ui/screens/quiz/SHOW_SUBMITTING_GUESS';
export const HIDE_SUBMITTING_GUESS = 'ui/screens/quiz/HIDE_SUBMITTING_GUESS';

export const SET_SUBMIT_GUESS_ERROR = 'ui/screens/quiz/SET_SUBMIT_GUESS_ERROR';
export const CLEAR_SUBMIT_GUESS_ERROR =
  'ui/screens/quiz/CLEAR_SUBMIT_GUESS_ERROR';

export function showSubmittingGuess() {
  return {
    type: SHOW_SUBMITTING_GUESS,
  };
}

export function hideSubmittingGuess() {
  return {
    type: HIDE_SUBMITTING_GUESS,
  };
}

export function setSubmitGuessError(errorMessage) {
  return {
    type: SET_SUBMIT_GUESS_ERROR,
    payload: errorMessage,
  };
}

export function clearSubmitGuessError() {
  return {
    type: CLEAR_SUBMIT_GUESS_ERROR,
  };
}
