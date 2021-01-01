import { combineReducers } from 'redux';
import theme from './theme';
import decks from './decks';
import ui from './ui';

export default combineReducers({
  theme,
  decks,
  ui,
});
