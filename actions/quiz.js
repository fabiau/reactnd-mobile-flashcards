export const RESET_DECK_QUIZ = 'RESET_QUIZ';

export function resetDeckQuiz(deckId) {
  return {
    type: RESET_DECK_QUIZ,
    payload: deckId,
  };
}
