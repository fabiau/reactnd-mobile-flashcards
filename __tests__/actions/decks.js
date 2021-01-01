import {
  addDeck,
  addedDeck,
  ADDED_DECK,
  ADD_DECK,
  hydrateDecks,
  HYDRATE_DECKS,
} from '../../actions/decks';

describe('actions::decks', () => {
  test('addDeck', () => {
    let action = addDeck({ title: 'Deck 1' });
    expect(action).toEqual({
      type: ADD_DECK,
      payload: { title: 'Deck 1' },
    });

    action = addDeck({ title: 'Lorem Ipsum' });
    expect(action).toEqual({
      type: ADD_DECK,
      payload: { title: 'Lorem Ipsum' },
    });
  });

  test('addedDeck', () => {
    let action = addedDeck({
      id: '61774805-16b9-4832-93f1-fcb493dd937a',
      title: 'Deck 1',
      timestamp: 321312321321,
    });
    expect(action).toEqual({
      type: ADDED_DECK,
      payload: {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        title: 'Deck 1',
        timestamp: 321312321321,
      },
    });

    action = addedDeck({
      id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
      title: 'Lorem Ipsum',
      timestamp: 312321,
    });
    expect(action).toEqual({
      type: ADDED_DECK,
      payload: {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        title: 'Lorem Ipsum',
        timestamp: 312321,
      },
    });
  });

  test('hydrateDecks', () => {
    let action = hydrateDecks({
      '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        title: 'Lorem Ipsum',
        timestamp: 312321,
      },
    });

    expect(action).toEqual({
      type: HYDRATE_DECKS,
      payload: {
        '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
          id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
          title: 'Lorem Ipsum',
          timestamp: 312321,
        },
      },
    });
  });
});
