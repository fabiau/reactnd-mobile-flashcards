import {
  addedGuess,
  hydrateGuesses,
  removeDeckGuesses,
} from '../../actions/guesses';
import guesses from '../../reducers/guesses';

describe('reducers::guesses', () => {
  test('addedGuess', () => {
    let state = guesses(undefined, {});
    expect(state).toEqual({});

    state = guesses(
      state,
      addedGuess({
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
        timestamp: 321312321321,
      })
    );
    expect(state).toEqual({
      '61774805-16b9-4832-93f1-fcb493dd937a': {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
        timestamp: 321312321321,
      },
    });
  });

  test('hydrateGuesses', () => {
    let state = guesses(undefined, {});
    expect(state).toEqual({});

    state = guesses(
      state,
      hydrateGuesses({
        '61774805-16b9-4832-93f1-fcb493dd937a': {
          id: '61774805-16b9-4832-93f1-fcb493dd937a',
          correct: true,
          timestamp: 321312321321,
        },
      })
    );
    expect(state).toEqual({
      '61774805-16b9-4832-93f1-fcb493dd937a': {
        id: '61774805-16b9-4832-93f1-fcb493dd937a',
        correct: true,
        timestamp: 321312321321,
      },
    });
  });

  test('removeDeckGuesses', () => {
    let state = guesses(
      {
        '61774805-16b9-4832-93f1-fcb493dd937a': {
          id: '61774805-16b9-4832-93f1-fcb493dd937a',
          correct: true,
          timestamp: 321312321321,
        },

        '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
          id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
          correct: false,
          timestamp: 123123123333,
        },
      },
      {}
    );

    state = guesses(
      state,
      removeDeckGuesses(['61774805-16b9-4832-93f1-fcb493dd937a'])
    );
    expect(state).toEqual({
      '50a37892-b6a8-4513-a4bc-88387fc12ea3': {
        id: '50a37892-b6a8-4513-a4bc-88387fc12ea3',
        correct: false,
        timestamp: 123123123333,
      },
    });
  });
});
