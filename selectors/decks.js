import { createSelector } from 'reselect';

function getCardCountLabel(cardCount) {
  if (cardCount === 0) {
    return '🙁 Empty deck';
  }
  return `${cardCount} card${cardCount !== 1 ? 's' : ''}`;
}

function formatDeckForDisplay(deck) {
  return {
    ...deck,
    cardCountLabel: getCardCountLabel(deck?.cards.length),
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
  (decks, deckId) =>
    typeof deckId === 'string' && deckId in (decks ?? {})
      ? formatDeckForDisplay(decks[deckId])
      : null
);
