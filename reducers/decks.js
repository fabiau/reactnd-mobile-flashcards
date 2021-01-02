import { ADDED_DECK, ADDED_DECK_CARD, HYDRATE_DECKS } from '../actions/decks';

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

    case ADDED_DECK_CARD: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          cards: [...state[action.payload.id].cards, action.payload.card],
        },
      };
    }

    case HYDRATE_DECKS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
