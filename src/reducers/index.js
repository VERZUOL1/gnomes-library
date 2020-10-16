import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import city from './city';
import library from './library';

export default history => combineReducers({
  router: connectRouter(history),
  city,
  library
});
