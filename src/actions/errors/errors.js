import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST
} from '../../constants/errors';

/**
 * 500 - Internal Server Error
 */
export function internalServerError(message) {
  return {
    type: INTERNAL_SERVER_ERROR,
    payload: {
      code: 500,
      message
    }
  };
}

/**
 * 404 - Not found
 */
export function notFoundError(message) {
  return {
    type: NOT_FOUND_ERROR,
    payload: {
      code: 404,
      message
    }
  };
}

/**
 * 400 - Bad Request
 */
export function badRequestError(message) {
  return {
    type: BAD_REQUEST,
    payload: {
      code: 400,
      message
    }
  };
}
