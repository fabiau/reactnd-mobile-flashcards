import { addedDeck, hydrateDecks } from '../../actions/decks';
import decks from '../../reducers/decks';

describe('reducers::decks', () => {
  test('addedDeck', () => {
    let state = decks(undefined, {});
    expect(state).toEqual({});

    state = decks(
      state,
      addedDeck({
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        title: 'Lorem Ipsum',
      })
    );
    expect(state).toEqual({
      '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        title: 'Lorem Ipsum',
        cards: [],
      },
    });
  });

  test('hydrateDecks', () => {
    let state = decks(undefined, {});
    expect(state).toEqual({});

    state = decks(
      state,
      hydrateDecks({
        '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
          id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
          title: 'Lorem Ipsum',
          timestamp: 312321,
        },
      })
    );
    expect(state).toEqual({
      '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        title: 'Lorem Ipsum',
        timestamp: 312321,
      },
    });
  });
});
