import { createSelector } from 'reselect';

function getCardCountLabel(questionCount) {
  if (questionCount === 0) {
    return '🙁 Empty deck';
  }
  return `${questionCount} card${questionCount !== 1 ? 's' : ''}`;
}

function formatDeckForDisplay(deck) {
  return {
    ...deck,
    cardCountLabel: getCardCountLabel(deck?.questions.length),
  };
}

export const getDecks = (state) => state.decks;

export const getDecksDisplayList = createSelector([getDecks], (decks) =>
  Object.keys(decks ?? {})
    .map((deckId) => formatDeckForDisplay(decks[deckId]))
    .sort((a, b) => b.timestamp - a.timestamp)
);

const getDeckIdProp = (_, props) => props.deckId;
export const getDeckById = createSelector(
  [getDecks, getDeckIdProp],
  (decks, deckId) => formatDeckForDisplay(decks[deckId])
);
