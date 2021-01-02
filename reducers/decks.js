import { ADDED_DECK, HYDRATE_DECKS } from '../actions/decks';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADDED_DECK:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          cards: [],
        },
      };

    case HYDRATE_DECKS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
