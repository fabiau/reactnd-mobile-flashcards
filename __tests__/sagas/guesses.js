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
import { handleAddGuess } from '../../sagas/guesses';
import { formatErrorMessage } from '../../utils/helpers/errors';
import { getCards } from '../../selectors/cards';

describe('sagas::guesses', () => {
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
