import { createSelector } from 'reselect';
import { getDeckById } from './decks';

export const getCards = (state) => state.cards;

export const getDeckCards = createSelector(
  [getDeckById, getCards],
  (deck, cards) => {
    if (deck === null) {
      return null;
    }

    const mappedCards = deck.cards?.reduce(
      (mappedCards, cardId) =>
        cardId in cards ? [...mappedCards, cards[cardId]] : mappedCards,
      []
    );

    return mappedCards;
  }
);
