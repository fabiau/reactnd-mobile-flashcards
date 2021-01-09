import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { call, cancel, put, select } from 'redux-saga/effects';
import { removeDeckGuesses } from '../../actions/guesses';
import { resetDeckQuiz } from '../../actions/quiz';
import { guessesDbModel } from '../../infra/db';
import { handleResetDeckQuiz } from '../../sagas/quiz';
import { getDecks } from '../../selectors/decks';
import { getGuesses } from '../../selectors/guesses';

describe('sagas::quiz', () => {
  describe('handleResetDeckQuiz', () => {
    describe('happy flow', () => {
      const iterator = handleResetDeckQuiz(resetDeckQuiz('123456'));

      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('gets state guesses', () => {
        expect(
          iterator.next({ 123456: { cards: ['1', '2', '3', '4'] } }).value
        ).toEqual(select(getGuesses));
      });

      it('calls delete of the guesses with the cards ids', () => {
        expect(
          iterator.next({ 1: {}, 2: {}, 3: {}, 4: {}, 5: {} }).value
        ).toEqual(call(guessesDbModel.multiDelete, ['1', '2', '3', '4']));
      });

      it('removes guesses from the store', () => {
        expect(iterator.next().value).toEqual(
          put(removeDeckGuesses(['1', '2', '3', '4']))
        );
      });
    });

    describe('invalid deck flow', () => {
      const iterator = handleResetDeckQuiz(resetDeckQuiz('123456'));
      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('cancels', () => {
        expect(
          iterator.next({ 333: { cards: ['1', '2', '3', '4'] } }).value
        ).toEqual(cancel());
      });
    });

    describe('no deck cards flow', () => {
      const iterator = handleResetDeckQuiz(resetDeckQuiz('123456'));
      it('gets state decks', () => {
        expect(iterator.next().value).toEqual(select(getDecks));
      });

      it('gets state guesses', () => {
        expect(iterator.next({ 123456: {} }).value).toEqual(select(getGuesses));
      });

      it('finishes', () => {
        expect(iterator.next({})).toEqual({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
