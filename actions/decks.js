export const ADD_DECK = 'ADD_DECK';
export const ADDED_DECK = 'ADDED_DECK';
export const HYDRATE_DECKS = 'HYDRATE_DECKS';

export function addDeck({ title }) {
  return {
    type: ADD_DECK,
    payload: { title },
  };
}

export function addedDeck({ id, title, timestamp }) {
  return {
    type: ADDED_DECK,
    payload: { id, title, timestamp },
  };
}

export function hydrateDecks(decks) {
  return {
    type: HYDRATE_DECKS,
    payload: decks,
  };
}
