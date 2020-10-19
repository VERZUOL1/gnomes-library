import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  BAD_REQUEST,
} from '../../constants/errors';
import {
  internalServerError,
  notFoundError,
  badRequestError,
} from './errors';

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
