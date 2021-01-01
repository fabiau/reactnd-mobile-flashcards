import { ADDED_DECK } from '../actions/decks';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADDED_DECK:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          questions: [],
        },
      };

    default:
      return state;
  }
}
