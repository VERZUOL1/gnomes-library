import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { getData } from './data';
import { GET_DATA } from '../constants/action-types/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('Data actions', () => {
  it('should create corresponding actions on getData call', () => {
    axios.request.mockImplementationOnce(() => Promise.resolve({
      data: []
    }));

    const expectedActions = [
      { type: `REQUEST_${GET_DATA}` },
      {
        type: `SUCCESS_${GET_DATA}`,
        payload: []
      }
    ];

    const store = mockStore();

    return store.dispatch(getData())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
