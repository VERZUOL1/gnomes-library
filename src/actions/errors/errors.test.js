import {
  FORBIDDEN_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  ODA_API_ERROR,
  SESSION_EXPIRED,
  BAD_REQUEST,
  UNAUTHORIZED
} from '../../constants/errors';
import {
  forbiddenError,
  internalServerError,
  notFoundError,
  ODAError,
  sessionExpired,
  badRequestError,
  unauthorizedError
} from './errors';

it('should return forbiddenError action', () => {
  const message = 'Forbidden Error';

  const expectedAction = {
    type: FORBIDDEN_ERROR,
    payload: {
      code: 403,
      message
    }
  };

  expect(forbiddenError(message)).toEqual(expectedAction);
});

it('should return internalServerError action', () => {
  const message = 'Initial Error';

  const expectedAction = {
    type: INTERNAL_SERVER_ERROR,
    payload: {
      code: 500,
      message
    }
  };

  expect(internalServerError(message)).toEqual(expectedAction);
});

it('should return notFoundError action', () => {
  const message = 'Not Found';

  const expectedAction = {
    type: NOT_FOUND_ERROR,
    payload: {
      code: 404,
      message
    }
  };

  expect(notFoundError(message)).toEqual(expectedAction);
});

it('should return ODAError action', () => {
  const message = 'Not Found';

  const expectedAction = {
    type: ODA_API_ERROR,
    payload: {
      code: 503,
      message
    }
  };

  expect(ODAError(message)).toEqual(expectedAction);
});

it('should return sessionExpired action', () => {
  const expectedAction = {
    type: SESSION_EXPIRED,
    payload: {
      code: 302
    }
  };

  expect(sessionExpired()).toEqual(expectedAction);
});

it('should return badRequestError action', () => {
  const message = 'Bad Request Error';

  const expectedAction = {
    type: BAD_REQUEST,
    payload: {
      code: 400,
      message
    }
  };

  expect(badRequestError(message)).toEqual(expectedAction);
});

it('should return Unauthorized action', () => {
  const message = 'Unauthorized';

  const expectedAction = {
    type: UNAUTHORIZED,
    payload: {
      code: 401,
      message
    }
  };

  expect(unauthorizedError(message)).toEqual(expectedAction);
});
