import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { api } from './api.tp';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('fetchApi test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return actions', () => {
    axios.request.mockImplementationOnce(() => Promise.resolve({
      data: {}
    }));

    const expectedActions = [
      {
        type: `REQUEST_GET_DATA`
      },
      {
        type: `SUCCESS_GET_DATA`,
        payload: {}
      }
    ];

    const store = mockStore({});

    return store.dispatch(api(
      '/getData',
      { type: 'GET_DATA' }
    )).then(() => expect(store.getActions()).toEqual(expectedActions))
  });
});
