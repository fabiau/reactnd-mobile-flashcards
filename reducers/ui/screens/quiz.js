import {
  CLEAR_SUBMIT_GUESS_ERROR,
  HIDE_SUBMITTING_GUESS,
  SET_SUBMIT_GUESS_ERROR,
  SHOW_SUBMITTING_GUESS,
} from '../../../actions/ui/screens/quiz';

export function getInitialState() {
  return {
    submittingGuess: false,
    submitGuessErrorMessage: null,
  };
}

export default function guess(state = getInitialState(), action) {
  switch (action.type) {
    case SHOW_SUBMITTING_GUESS:
      return {
        ...state,
        submittingGuess: true,
      };

    case HIDE_SUBMITTING_GUESS:
      return {
        ...state,
        submittingGuess: false,
      };

    case SET_SUBMIT_GUESS_ERROR:
      return {
        ...state,
        submitGuessErrorMessage: action.payload,
      };

    case CLEAR_SUBMIT_GUESS_ERROR:
      return {
        ...state,
        submitGuessErrorMessage: null,
      };

    default:
      return state;
  }
}
