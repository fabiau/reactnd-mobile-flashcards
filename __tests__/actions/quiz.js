import { resetDeckQuiz, RESET_DECK_QUIZ } from '../../actions/quiz';

describe('actions::quiz', () => {
  test('resetDeckQuiz', () => {
    let action = resetDeckQuiz({
      deckId: '1234',
    });
    expect(action).toEqual({
      type: RESET_DECK_QUIZ,
      payload: { deckId: '1234' },
    });
  });
});
