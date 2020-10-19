import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import city from './city';
import library from './library';
import filter from './filter';
import errors from './errors';

export default history => combineReducers({
  router: connectRouter(history),
  city,
  library,
  filter,
  errors
});
