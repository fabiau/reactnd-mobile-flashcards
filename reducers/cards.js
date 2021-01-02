import { ADDED_CARD, HYDRATE_CARDS } from '../actions/cards';

export default function cards(state = {}, action) {
  switch (action.type) {
    case ADDED_CARD:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case HYDRATE_CARDS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
