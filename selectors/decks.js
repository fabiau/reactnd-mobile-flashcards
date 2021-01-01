import { createSelector } from 'reselect';

export const getDecks = (state) => state.decks;
export const getDecksDisplayList = createSelector([getDecks], (decks) =>
  Object.keys(decks ?? {})
    .map((deckId) => decks[deckId])
    .sort((a, b) => b.timestamp - a.timestamp)
);
