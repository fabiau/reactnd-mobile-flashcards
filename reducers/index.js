import { combineReducers } from 'redux';
import theme from './theme';
import decks from './decks';
import cards from './cards';
import guesses from './guesses';
import ui from './ui';

export default combineReducers({
  theme,
  decks,
  cards,
  guesses,
  ui,
});
