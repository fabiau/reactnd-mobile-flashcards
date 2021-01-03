import { createSelector } from 'reselect';
import { getCards } from '../../cards';
import { getDeckById } from '../../decks';
import { getGuesses } from '../../guesses';

export const getQuizScreenState = (state) =>
  state.ui?.screens?.quiz ?? {
    submittingGuess: false,
    submitGuessErrorMessage: null,
  };

export const getQuizRemainingCards = createSelector(
  [getDeckById, getCards, getGuesses],
  (deck, cards, guesses) => {
    if (deck === null) {
      return {
        errorMessage: "Deck doesn't exist.",
        data: null,
      };
    }

    const mappedCards = deck.cards?.reduce(
      (mappedCards, cardId) =>
        cardId in cards ? [...mappedCards, cards[cardId]] : mappedCards,
      []
    );

    if (!mappedCards || mappedCards.length === 0) {
      return {
        errorMessage: 'Deck is empty.',
        data: null,
      };
    }

    const remainingCards = mappedCards
      .reduce(
        (remainingCards, card) =>
          card.id in guesses ? remainingCards : [...remainingCards, card],
        []
      )
      .sort((a, b) => a.timestamp - b.timestamp);

    return {
      errorMessage: null,
      data: remainingCards,
    };
  }
);
