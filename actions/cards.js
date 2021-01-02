export const ADD_CARD = 'ADD_CARD';
export const ADDED_CARD = 'ADDED_CARD';
export const HYDRATE_CARDS = 'HYDRATE_CARDS';

export function addCard({ deckId, question, answer }) {
  return {
    type: ADD_CARD,
    payload: { deckId, question, answer },
  };
}

export function addedCard({ id, deckId, question, answer, timestamp }) {
  return {
    type: ADDED_CARD,
    payload: { id, deckId, question, answer, timestamp },
  };
}

export function hydrateCards(cards) {
  return {
    type: HYDRATE_CARDS,
    payload: cards,
  };
}
