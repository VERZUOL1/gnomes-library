import reducer, { initialState } from './library';
import { GET_DATA } from '../constants/action-types/data';

describe('Library reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState
    })
  });

  it('should handle REQUEST_GET_DATA action', () => {
    expect(
      reducer(initialState, {
        type: `REQUEST_${GET_DATA}`
      })
    ).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle SUCCESS_GET_DATA', () => {
    expect(reducer(initialState, {
      type: `SUCCESS_${GET_DATA}`,
      payload: {
        Brastlewark: [{ id: 0, name: 'Ecki Gimbalbooster' }, { id: 1, name: 'Libalia Nozzlelauncher' }]
      }
    })).toEqual({
      ...initialState,
      data: {
        Brastlewark: [{ id: 0, name: 'Ecki Gimbalbooster' }, { id: 1, name: 'Libalia Nozzlelauncher' }]
      },
      loading: false,
      error: false,
    })
  });
});

