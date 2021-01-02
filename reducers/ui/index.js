import { combineReducers } from 'redux';
import theme from './theme';
import errors from './errors';
import latestsAdded from './latestsAdded';
import loaders from './loaders';

export default combineReducers({
  theme,
  errors,
  latestsAdded,
  loaders,
});
