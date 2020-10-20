import { REMOVE_FILTERS, UPDATE_FILTER } from '../constants/action-types/filter';

export const initialState = {
  professions: [],
  age: {
    from: null,
    to: null
  },
  weight: {
    from: null,
    to: null
  },
  height: {
    from: null,
    to: null
  },
  hairColor: [],
  withFriends: false,
  search: ''
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER: {
      if (action.field) {
        return {
          ...state,
          [action.filterType]: {
            ...state[action.filterType],
            [action.field]: action.payload === '' ? null : action.payload
          }
        };
      }
      return {
        ...state,
        [action.filterType]: action.payload
      };
    }
    case REMOVE_FILTERS: {
      return initialState;
    }
    default:
      return state;
  }
}
