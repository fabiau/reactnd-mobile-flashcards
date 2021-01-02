export const SHOW_SUBMITTING = 'ui/screens/addCard/SHOW_SUBMITTING';
export const HIDE_SUBMITTING = 'ui/screens/addCard/HIDE_SUBMITTING';

export const SET_ERROR = 'ui/screens/addCard/SET_ERROR';
export const CLEAR_ERROR = 'ui/screens/addCard/CLEAR_ERROR';

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
