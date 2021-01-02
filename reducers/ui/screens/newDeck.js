import {
  CLEAR_ERROR,
  HIDE_SUBMITTING,
  SET_ERROR,
  SET_LAST_SUBMITTED_ID,
  SHOW_SUBMITTING,
} from '../../../actions/ui/screens/newDeck';

export function getInitialState() {
  return {
    submitting: false,
    errorMessage: null,
    lastSubmittedId: null,
  };
}

export default function newDeck(state = getInitialState(), action) {
  switch (action.type) {
    case SHOW_SUBMITTING:
      return {
        ...state,
        submitting: true,
      };

    case HIDE_SUBMITTING:
      return {
        ...state,
        submitting: false,
      };

    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null,
      };

    case SET_LAST_SUBMITTED_ID:
      return {
        ...state,
        lastSubmittedId: action.payload,
      };

    default:
      return state;
  }
}
