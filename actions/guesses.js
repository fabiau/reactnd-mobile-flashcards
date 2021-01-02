export const ADD_GUESS = 'ADD_GUESS';
export const ADDED_GUESS = 'ADDED_GUESS';
export const HYDRATE_GUESSES = 'HYDRATE_GUESSES';
export const REMOVE_DECK_GUESSES = 'REMOVE_DECK_GUESSES';

export function addGuess({ cardId, correct }) {
  return {
    type: ADD_GUESS,
    payload: { cardId, correct },
  };
}

export function addedGuess({ cardId, correct, timestamp }) {
  return {
    type: ADDED_GUESS,
    payload: { cardId, correct, timestamp },
  };
}

export function hydrateGuesses(guesses) {
  return {
    type: HYDRATE_GUESSES,
    payload: guesses,
  };
}

export function removeDeckGuesses(cardsIds) {
  return {
    type: REMOVE_DECK_GUESSES,
    payload: cardsIds,
  };
}
