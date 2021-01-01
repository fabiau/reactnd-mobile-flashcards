export const ADD_DECK = 'ADD_DECK';
export const ADDED_DECK = 'ADDED_DECK';

export function addDeck({ title }) {
  return {
    type: ADD_DECK,
    payload: { title },
  };
}

export function addedDeck({ id, title }) {
  return {
    type: ADDED_DECK,
    payload: { id, title },
  };
}
