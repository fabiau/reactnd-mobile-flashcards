import { combineReducers } from 'redux';
import errors from './errors';
import loaders from './loaders';

export default combineReducers({
  errors,
  loaders,
});
