import {
  ADDED_GUESS,
  HYDRATE_GUESSES,
  REMOVE_DECK_GUESSES,
} from '../actions/guesses';

export default function guesses(state = {}, action) {
  switch (action.type) {
    case ADDED_GUESS:
      return {
        ...state,
        [action.payload.cardId]: action.payload,
      };

    case HYDRATE_GUESSES:
      return {
        ...state,
        ...action.payload,
      };

    case REMOVE_DECK_GUESSES:
      return Object.keys(state).reduce((filtered, cardId) => {
        return action.payload.includes(cardId)
          ? filtered
          : { ...filtered, [cardId]: state[cardId] };
      }, {});

    default:
      return state;
  }
}
