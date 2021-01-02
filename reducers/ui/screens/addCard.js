import {
  CLEAR_ERROR,
  HIDE_SUBMITTING,
  SET_ERROR,
  SHOW_SUBMITTING,
} from '../../../actions/ui/screens/addCard';

export function getInitialState() {
  return {
    submitting: false,
    errorMessage: null,
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

    default:
      return state;
  }
}
