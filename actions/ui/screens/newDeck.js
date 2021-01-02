export const SHOW_SUBMITTING = 'ui/screens/newDeck/SHOW_SUBMITTING';
export const HIDE_SUBMITTING = 'ui/screens/newDeck/HIDE_SUBMITTING';

export const SET_ERROR = 'ui/screens/newDeck/SET_ERROR';
export const CLEAR_ERROR = 'ui/screens/newDeck/CLEAR_ERROR';

export const SET_LAST_SUBMITTED_ID = 'ui/screens/newDeck/SET_LAST_SUBMITTED_ID';

export function showSubmitting() {
  return {
    type: SHOW_SUBMITTING,
  };
}

export function hideSubmitting() {
  return {
    type: HIDE_SUBMITTING,
  };
}

export function setError(errorMessage) {
  return {
    type: SET_ERROR,
    payload: errorMessage,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function setLastSubmittedId(deckId) {
  return {
    type: SET_LAST_SUBMITTED_ID,
    payload: deckId,
  };
}
