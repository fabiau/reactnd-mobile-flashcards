import { call, put } from 'redux-saga/effects';
import { addDeck, addedDeck } from '../../actions/decks';
import {
  clearError,
  hideSubmitting,
  setError,
  setLastSubmittedId,
  showSubmitting,
} from '../../actions/ui/screens/newDeck';
import { decksDbModel } from '../../infra/db';
import { handleAddDeck } from '../../sagas/decks';
import { formatErrorMessage } from '../../utils/helpers/errors';

describe('sagas::decks', () => {
  describe('handleAddDeck', () => {
    describe('happy flow', () => {
      let iterator = handleAddDeck(addDeck({ title: 'Lorem Ipsum' }));

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmitting()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearError()));
      });

      it('gets the current timestamp', () => {
        expect(iterator.next().value).toEqual(call(Date.now));
      });

      it('calls decksDbModel.add with the payload deck', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(decksDbModel.add, {
            title: 'Lorem Ipsum',
            timestamp: 1231232131,
            cards: [],
          })
        );
      });

      it('adds the deck to the store', () => {
        expect(
          iterator.next({
            id: '1',
            title: 'Lorem Ipsum',
            timestamp: 1231232131,
            cards: [],
          }).value
        ).toEqual(
          put(
            addedDeck({
              id: '1',
              title: 'Lorem Ipsum',
              timestamp: 1231232131,
              cards: [],
            })
          )
        );
      });

      it('sets the newly added deck as the latest added', () => {
        expect(iterator.next().value).toEqual(put(setLastSubmittedId('1')));
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmitting()));
      });
    });

    describe('error flow', () => {
      let iterator = handleAddDeck(addDeck({ title: 'Lorem Ipsum' }));

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmitting()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearError()));
      });

      it('gets the current timestamp', () => {
        expect(iterator.next().value).toEqual(call(Date.now));
      });

      it('calls decksDbModel.add with the payload deck', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(decksDbModel.add, {
            title: 'Lorem Ipsum',
            timestamp: 1231232131,
            cards: [],
          })
        );
      });

      it('handles unexpected db errors', () => {
        expect(iterator.throw(new Error('Ooops!')).value).toEqual(
          put(setError(formatErrorMessage(new Error('Ooops!'))))
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmitting()));
      });
    });
  });
});
