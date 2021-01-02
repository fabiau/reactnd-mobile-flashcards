export const ADD_GUESS = 'ADD_GUESS';
export const ADDED_GUESS = 'ADDED_GUESS';
export const HYDRATE_GUESSES = 'HYDRATE_GUESSES';
export const REMOVE_CARD_GUESSES = 'REMOVE_CARD_GUESSES';

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

export function removeCardGuesses(cardId) {
  return {
    type: REMOVE_CARD_GUESSES,
    payload: cardId,
  };
}
