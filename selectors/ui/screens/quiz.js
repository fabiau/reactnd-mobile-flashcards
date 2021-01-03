import { createSelector } from 'reselect';
import { getCards, getDeckCards } from '../../cards';
import { getGuesses } from '../../guesses';

// TODO: Use submittingGuess on the view.
export const getQuizScreenState = (state) =>
  state.ui?.screens?.quiz ?? {
    submittingGuess: false,
    submitGuessErrorMessage: null,
  };

export const getQuizProgress = createSelector(
  [getDeckCards, getGuesses],
  (cards, guesses) => {
    if (!cards || !guesses || cards.length === 0) {
      return {
        isInProgress: false,
        complete: false,
        answeredCorrectCount: 0,
        totalQuestions: 0,
        isComplete: false,
      };
    }

    const filteredGuesses = cards.reduce(
      (filteredGuesses, card) =>
        card.id in guesses
          ? [...filteredGuesses, guesses[card.id]]
          : filteredGuesses,
      []
    );

    const isInProgress = filteredGuesses.length !== 0;
    const answeredCorrectCount = filteredGuesses.filter(
      (guess) => guess.correct
    ).length;
    const totalQuestions = cards.length;

    return {
      isInProgress,
      answeredCorrectCount,
      totalQuestions,
      isComplete: filteredGuesses.length === cards.length,
    };
  }
);

export const getQuizRemainingCards = createSelector(
  [getDeckCards, getGuesses],
  (cards, guesses) => {
    if (!cards) {
      return {
        errorMessage: "Deck doesn't exist.",
        data: null,
      };
    }

    if (cards.length === 0) {
      return {
        errorMessage: 'Deck is empty.',
        data: null,
      };
    }

    const remainingCards = cards
      .reduce(
        (remainingCards, card) =>
          card.id in guesses
            ? remainingCards
            : [
                ...remainingCards,
                { ...card, cardNumber: cards.indexOf(card) + 1 },
              ],
        []
      )
      .sort((a, b) => a.timestamp - b.timestamp);

    return {
      errorMessage: null,
      data: remainingCards,
    };
  }
);
