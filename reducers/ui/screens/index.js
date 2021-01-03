import { combineReducers } from 'redux';
import newDeck from './newDeck';
import addCard from './addCard';
import quiz from './quiz';

export default combineReducers({
  newDeck,
  addCard,
  quiz,
});
