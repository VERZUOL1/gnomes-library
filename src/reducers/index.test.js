import { combineReducers } from 'redux';

jest.mock('redux', () => ({
  combineReducers: jest.fn()
}));

it('should return function', () => {
  const history = {};
  combineReducers(history);
  expect(combineReducers).toBeCalledTimes(1);
});
