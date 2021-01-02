import { combineReducers } from 'redux';
import errors from './errors';
import latestsAdded from './latestsAdded';
import loaders from './loaders';

export default combineReducers({
  errors,
  latestsAdded,
  loaders,
});
