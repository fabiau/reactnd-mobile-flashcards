import {
  addCard,
  addedCard,
  ADDED_CARD,
  ADD_CARD,
  hydrateCards,
  HYDRATE_CARDS,
} from '../../actions/cards';

describe('actions::cards', () => {
  test('addCard', () => {
    let action = addCard({
      deckId: '1234',
      answer: 'Answer',
      question: 'Question',
    });
    expect(action).toEqual({
      type: ADD_CARD,
      payload: { deckId: '1234', answer: 'Answer', question: 'Question' },
    });
  });

  test('addedCard', () => {
    let action = addedCard({
      id: '61774805-16b9-4832-93f1-fcb493dd937a',
      deckId: '1234',
      answer: 'Answer',
      question: 'Question',
      timestamp: 321312321321,
    });
    expect(action).toEqual({
      type: ADDED_CARD,
      payload: {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        deckId: '1234',
        answer: 'Answer',
        question: 'Question',
        timestamp: 321312321321,
      },
    });
  });

  test('hydrateCards', () => {
    let action = hydrateCards({
      '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        deckId: '1234',
        answer: 'Answer',
        question: 'Question',
        timestamp: 312321,
      },
    });

    expect(action).toEqual({
      type: HYDRATE_CARDS,
      payload: {
        '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
          id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
          deckId: '1234',
          answer: 'Answer',
          question: 'Question',
          timestamp: 312321,
        },
      },
    });
  });
});
