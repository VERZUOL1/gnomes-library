// actions
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST
} from '../constants/errors';

// default state
const initialState = {
  internalServer: undefined,
  notFound: undefined,
  badRequest: undefined
};

/**
 * Global Errors reducer
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case INTERNAL_SERVER_ERROR: {
      return {
        ...state,
        internalServer: action.payload.message
      };
    }
    case NOT_FOUND_ERROR: {
      return {
        ...state,
        notFound: action.payload.message
      };
    }
    case BAD_REQUEST: {
      return {
        ...state,
        badRequest: action.payload.message
      };
    }
    default:
      return state;
  }
}
