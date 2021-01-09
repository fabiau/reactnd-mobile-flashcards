import { call, put, select } from 'redux-saga/effects';
import { addGuess, addedGuess } from '../../actions/guesses';
import { addedDeckGuess } from '../../actions/cards';
import {
  clearSubmitGuessError,
  hideSubmittingGuess,
  setSubmitGuessError,
  showSubmittingGuess,
} from '../../actions/ui/screens/quiz';
import { guessesDbModel, cardsDbModel } from '../../infra/db';
import {
  handleAddGuess,
  isQuizComplete,
  rescheduleQuizReminder,
} from '../../sagas/guesses';
import { formatErrorMessage } from '../../utils/helpers/errors';
import { getCards } from '../../selectors/cards';
import { getGuesses } from '../../selectors/guesses';
import { getDecks } from '../../selectors/decks';
import { rescheduleDailyNotification } from '../../sagas/notifications';
import { LocalNotifications } from '../../constants/notifications';

describe('sagas::guesses', () => {
  describe('isQuizComplete', () => {
    test('when all deck cards have guesses', () => {
      const iterator = isQuizComplete({ deckId: '123456' });
      expect(iterator.next().value).toEqual(select(getGuesses));
      expect(iterator.next({ 1: {}, 2: {}, 3: {} }).value).toEqual(
        select(getDecks)
      );

      expect(
        iterator.next({ 123456: { id: 123456, cards: ['1', '2', '3'] } })
      ).toEqual({
        done: true,
        value: true,
      });
    });

    test('when not all deck cards have guesses', () => {
      const iterator = isQuizComplete({ deckId: '1233' });
      expect(iterator.next().value).toEqual(select(getGuesses));
      expect(iterator.next({ 1312321: {}, 3213212: {}, 33: {} }).value).toEqual(
        select(getDecks)
      );

      expect(
        iterator.next({
          1233: { id: 123456, cards: ['1312321', '3213212', '3333'] },
          123456: { id: 123456, cards: ['1321', '3212', '33'] },
        })
      ).toEqual({
        done: true,
        value: false,
      });
    });

    test("when the deck doesn't have guesses", () => {
      const iterator = isQuizComplete({ deckId: '3213133' });
      expect(iterator.next().value).toEqual(select(getGuesses));
      expect(iterator.next({ 1312321: {}, 3213212: {}, 33: {} }).value).toEqual(
        select(getDecks)
      );

      expect(
        iterator.next({
          1233: { id: 123456, cards: ['1312321', '3213212', '3333'] },
          123456: { id: 123456, cards: ['1321', '3212', '33'] },
        })
      ).toEqual({
        done: true,
        value: false,
      });
    });
  });

  test('rescheduleQuizReminder', () => {
    const iterator = rescheduleQuizReminder();
    expect(iterator.next().value).toEqual(
      call(rescheduleDailyNotification, LocalNotifications.QuizReminder)
    );
  });

  describe('handleAddGuess', () => {
    describe('happy flow', () => {
      let iterator = handleAddGuess(
        addGuess({ cardId: '123456', correct: true })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmittingGuess()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearSubmitGuessError()));
      });

      it('gets state cards', () => {
        expect(iterator.next().value).toEqual(select(getCards));
      });

      it('gets the current timestamp', () => {
        expect(
          iterator.next({
            123456: {
              id: '123456',
            },
          }).value
        ).toEqual(call(Date.now));
      });

      it('calls guessesDbModel.add with the payload guess', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(guessesDbModel.add, {
            id: '123456',
            correct: true,
            timestamp: 1231232131,
          })
        );
      });

      it('adds the guess to the store', () => {
        expect(
          iterator.next({
            id: '123456',
            correct: true,
            timestamp: 1231232131,
          }).value
        ).toEqual(
          put(
            addedGuess({
              id: '123456',
              correct: true,
              timestamp: 1231232131,
            })
          )
        );
      });

      it('checks if the quiz is completed', () => {
        expect(iterator.next().value).toEqual(
          call(isQuizComplete, {
            id: '123456',
          })
        );
      });

      it('if it is complete, reschedule notification', () => {
        expect(iterator.next(true).value).toEqual(call(rescheduleQuizReminder));
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmittingGuess()));
      });
    });

    describe('error flow', () => {
      let iterator = handleAddGuess(
        addGuess({ cardId: '123456', correct: false })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmittingGuess()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearSubmitGuessError()));
      });

      it('gets state cards', () => {
        expect(iterator.next().value).toEqual(select(getCards));
      });

      it('gets the current timestamp', () => {
        expect(
          iterator.next({
            123456: {
              id: '123456',
            },
          }).value
        ).toEqual(call(Date.now));
      });

      it('calls guessesDbModel.add with the payload guess', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(guessesDbModel.add, {
            id: '123456',
            correct: false,
            timestamp: 1231232131,
          })
        );
      });

      it('handles unexpected db errors', () => {
        expect(iterator.throw(new Error('Ooops!')).value).toEqual(
          put(setSubmitGuessError(formatErrorMessage(new Error('Ooops!'))))
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmittingGuess()));
      });
    });

    describe('inexistent deck flow', () => {
      let iterator = handleAddGuess(
        addGuess({ cardId: '123456', correct: false })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmittingGuess()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearSubmitGuessError()));
      });

      it('gets state cards', () => {
        expect(iterator.next().value).toEqual(select(getCards));
      });

      it('sets the error that the card does not exist', () => {
        expect(
          iterator.next({
            789798789: {
              id: '789798789',
            },
          }).value
        ).toEqual(
          put(
            setSubmitGuessError(
              "Guess can't be submitted: card does not exist."
            )
          )
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmittingGuess()));
      });
    });
  });
});
