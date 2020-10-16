import { GET_DATA } from '../constants/action-types/data';

export const initialState = {
  data: null,
  error: false
};

export default function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case `REQUEST_${GET_DATA}`: {
      return {
        ...state,
        error: false,
        loading: true
      };
    }
    case `ERROR_${GET_DATA}`: {
      return {
        ...state,
        error: true,
        loading: false
      };
    }
    case `SUCCESS_${GET_DATA}`: {
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload
      };
    }
    default:
      return state;
  }
}
