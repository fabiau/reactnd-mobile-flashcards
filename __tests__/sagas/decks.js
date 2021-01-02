import { call, put } from 'redux-saga/effects';
import { addDeck, addedDeck } from '../../actions/decks';
import { setError } from '../../actions/ui/errors';
import { setLatestAdded } from '../../actions/ui/latestsAdded';
import { setLoader } from '../../actions/ui/loaders';
import UIStateKeys from '../../constants/UIStateKeys';
import { decksDbModel } from '../../infra/db';
import { handleAddDeck } from '../../sagas/decks';
import { formatErrorMessage } from '../../utils/helpers/errors';

describe('sagas::decks', () => {
  describe('handleAddDeck', () => {
    describe('happy flow', () => {
      let iterator = handleAddDeck(addDeck({ title: 'Lorem Ipsum' }));

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(
          put(setLoader({ key: UIStateKeys.NewDeck, value: true }))
        );
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(
          put(setError({ key: UIStateKeys.NewDeck, value: null }))
        );
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
        expect(iterator.next().value).toEqual(
          put(setLatestAdded({ key: UIStateKeys.NewDeck, value: '1' }))
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(
          put(setLoader({ key: UIStateKeys.NewDeck, value: false }))
        );
      });
    });

    describe('error flow', () => {
      let iterator = handleAddDeck(addDeck({ title: 'Lorem Ipsum' }));

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(
          put(setLoader({ key: UIStateKeys.NewDeck, value: true }))
        );
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(
          put(setError({ key: UIStateKeys.NewDeck, value: null }))
        );
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
          put(
            setError({
              key: UIStateKeys.NewDeck,
              value: formatErrorMessage(new Error('Ooops!')),
            })
          )
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(
          put(setLoader({ key: UIStateKeys.NewDeck, value: false }))
        );
      });
    });
  });
});
