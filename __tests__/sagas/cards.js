import { call, put, select } from 'redux-saga/effects';
import { addCard, addedCard } from '../../actions/cards';
import { addedDeckCard } from '../../actions/decks';
import {
  clearError,
  hideSubmitting,
  setError,
  showSubmitting,
} from '../../actions/ui/screens/addCard';
import { cardsDbModel, decksDbModel } from '../../infra/db';
import { handleAddCard } from '../../sagas/cards';
import { getDecks } from '../../selectors/decks';
import { formatErrorMessage } from '../../utils/helpers/errors';

describe('sagas::cards', () => {
  describe('handleAddCard', () => {
    describe('happy flow', () => {
      let iterator = handleAddCard(
        addCard({ deckId: '123456', answer: 'Answer', question: 'Question' })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmitting()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearError()));
      });

      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('gets the current timestamp', () => {
        expect(
          iterator.next({
            123456: {
              id: '123456',
              cards: ['1'],
            },
          }).value
        ).toEqual(call(Date.now));
      });

      it('calls cardsDbModel.add with the payload card', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(cardsDbModel.add, {
            deckId: '123456',
            answer: 'Answer',
            question: 'Question',
            timestamp: 1231232131,
          })
        );
      });

      it('calls decksDbModel.patch for the given deck with the new card', () => {
        expect(
          iterator.next({
            id: '2',
            deckId: '123456',
            answer: 'Answer',
            question: 'Question',
            timestamp: 1231232131,
          }).value
        ).toEqual(
          call(decksDbModel.patch, {
            id: '123456',
            cards: ['1', '2'],
          })
        );
      });

      it('adds the card to the store', () => {
        expect(iterator.next().value).toEqual(
          put(
            addedCard({
              id: '2',
              deckId: '123456',
              answer: 'Answer',
              question: 'Question',
              timestamp: 1231232131,
            })
          )
        );

        expect(iterator.next().value).toEqual(
          put(
            addedDeckCard({
              id: '123456',
              card: '2',
            })
          )
        );
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmitting()));
      });
    });

    describe('error flow', () => {
      let iterator = handleAddCard(
        addCard({ deckId: '123456', answer: 'Answer', question: 'Question' })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmitting()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearError()));
      });

      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('gets the current timestamp', () => {
        expect(
          iterator.next({
            123456: {
              id: '123456',
              cards: ['1'],
            },
          }).value
        ).toEqual(call(Date.now));
      });

      it('calls cardsDbModel.add with the payload card', () => {
        expect(iterator.next(1231232131).value).toEqual(
          call(cardsDbModel.add, {
            deckId: '123456',
            answer: 'Answer',
            question: 'Question',
            timestamp: 1231232131,
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

    describe('inexistent deck flow', () => {
      let iterator = handleAddCard(
        addCard({ deckId: '123456', answer: 'Answer', question: 'Question' })
      );

      it('starts the loader for the UI', () => {
        expect(iterator.next().value).toEqual(put(showSubmitting()));
      });

      it('clears the error for the UI', () => {
        expect(iterator.next().value).toEqual(put(clearError()));
      });

      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('sets the error that the deck does not exist', () => {
        expect(
          iterator.next({
            789798789: {
              id: '789798789',
              cards: ['1'],
            },
          }).value
        ).toEqual(put(setError("Card can't be added: deck does not exist.")));
      });

      it('disables the UI loading state', () => {
        expect(iterator.next().value).toEqual(put(hideSubmitting()));
      });
    });
  });
});
