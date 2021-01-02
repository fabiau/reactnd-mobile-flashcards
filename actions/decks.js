export const ADD_DECK = 'ADD_DECK';
export const ADDED_DECK = 'ADDED_DECK';
export const ADDED_DECK_CARD = 'ADDED_DECK_CARD';
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

export function addedDeckCard({ id, card }) {
  return {
    type: ADDED_DECK_CARD,
    payload: { id, card },
  };
}

export function hydrateDecks(decks) {
  return {
    type: HYDRATE_DECKS,
    payload: decks,
  };
}
