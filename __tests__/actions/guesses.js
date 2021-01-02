import {
  addGuess,
  addedGuess,
  ADDED_GUESS,
  ADD_GUESS,
  hydrateGuesses,
  HYDRATE_GUESSES,
  removeCardGuesses,
  REMOVE_CARD_GUESSES,
} from '../../actions/guesses';

describe('actions::guesses', () => {
  test('addGuess', () => {
    let action = addGuess({
      cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
      correct: true,
    });
    expect(action).toEqual({
      type: ADD_GUESS,
      payload: {
        cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
      },
    });
  });

  test('addedGuess', () => {
    let action = addedGuess({
      cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
      correct: true,
      timestamp: 321312321321,
    });
    expect(action).toEqual({
      type: ADDED_GUESS,
      payload: {
        cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
        timestamp: 321312321321,
      },
    });
  });

  test('hydrateGuesses', () => {
    let action = hydrateGuesses({
      '61774805-16b9-4832-93f1-fcb493dd937a': {
        cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
        timestamp: 312321,
      },
    });

    expect(action).toEqual({
      type: HYDRATE_GUESSES,
      payload: {
        '61774805-16b9-4832-93f1-fcb493dd937a': {
          cardId: '61774805-16b9-4832-93f1-fcb493dd937a',
          correct: true,
          timestamp: 312321,
        },
      },
    });
  });

  test('removeCardGuesses', () => {
    let action = removeCardGuesses('61774805-16b9-4832-93f1-fcb493dd937a');
    expect(action).toEqual({
      type: REMOVE_CARD_GUESSES,
      payload: '61774805-16b9-4832-93f1-fcb493dd937a',
    });
  });
});
