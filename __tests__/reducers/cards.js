import { addedCard, hydrateCards } from '../../actions/cards';
import cards from '../../reducers/cards';

describe('reducers::cards', () => {
  test('addedCard', () => {
    let state = cards(undefined, {});
    expect(state).toEqual({});

    state = cards(
      state,
      addedCard({
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        deckId: '1234',
        answer: 'Answer',
        question: 'Question',
        timestamp: 321312321321,
      })
    );
    expect(state).toEqual({
      ['61774805-16b9-4832-93f1-fcb493dd937a']: {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        deckId: '1234',
        answer: 'Answer',
        question: 'Question',
        timestamp: 321312321321,
      },
    });
  });

  test('hydrateCards', () => {
    let state = cards(undefined, {});
    expect(state).toEqual({});

    state = cards(
      state,
      hydrateCards({
        '61774805-16b9-4832-93f1-fcb493dd937a': {
          id: '61774805-16b9-4832-93f1-fcb493dd937a',
          deckId: '1234',
          answer: 'Answer',
          question: 'Question',
          timestamp: 321312321321,
        },
      })
    );
    expect(state).toEqual({
      '61774805-16b9-4832-93f1-fcb493dd937a': {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        deckId: '1234',
        answer: 'Answer',
        question: 'Question',
        timestamp: 321312321321,
      },
    });
  });
});
