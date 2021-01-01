import { combineReducers } from 'redux';
import theme from './theme';
import decks from './decks';

export default combineReducers({
  theme,
  decks,
});
