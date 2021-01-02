import { combineReducers } from 'redux';
import newDeck from './newDeck';
import addCard from './addCard';

export default combineReducers({ newDeck, addCard });
