import { combineReducers } from 'redux';
import decks from './decks';
import cards from './cards';
import guesses from './guesses';
import ui from './ui';

export default combineReducers({
  decks,
  cards,
  guesses,
  ui,
});
