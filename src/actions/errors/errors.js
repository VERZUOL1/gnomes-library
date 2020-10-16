import {
  FORBIDDEN_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  ODA_API_ERROR,
  SESSION_EXPIRED,
  BAD_REQUEST,
  UNAUTHORIZED
} from '../../constants/errors';

/**
 * 403 - Forbidden
 */
export function forbiddenError(message) {
  return {
    type: FORBIDDEN_ERROR,
    payload: {
      code: 403,
      message
    }
  };
}

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
 * Display Approve errors
 * @param message
 * @returns {{type, message: *}}
 */
export function ODAError(message) {
  return {
    type: ODA_API_ERROR,
    payload: {
      code: 503,
      message
    }
  };
}

/**
 * 302 - Session expired
 */
export function sessionExpired() {
  return {
    type: SESSION_EXPIRED,
    payload: {
      code: 302
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

/**
 * 401 - Unauthorized
 */
export function unauthorizedError(message) {
  return {
    type: UNAUTHORIZED,
    payload: {
      code: 401,
      message
    }
  };
}
