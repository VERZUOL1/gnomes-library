import axios from 'axios';
import {
  internalServerError,
  notFoundError,
  badRequestError
} from './errors/errors';

/**
 * API wrapper
 */
export function apiNative(url, methodOption, parameters, options) {
  let requestUrl = url;
  const method = methodOption || 'GET';
  let requestParams = { method };
  const params = parameters || {};

  if (requestParams.method === 'GET') {
    requestUrl = Object.keys(params)
      .reduce((previousValue, currentValue) => {
        if (Object.prototype.hasOwnProperty.call(params, currentValue)) {
          return `${previousValue}${currentValue}=${encodeURIComponent(params[currentValue])}&`;
        }
        return previousValue;
      }, `${requestUrl}?`);
    requestUrl = requestUrl.substring(0, requestUrl.length - 1);
    requestParams.headers = {
      Accept: 'application/json'
      // 'Content-Type': 'application/json'
    };
    // eslint-disable-next-line
  } else if (params instanceof FormData) {
    requestParams = { method, body: params };
  } else {
    requestParams.body = JSON.stringify(params);
    requestParams.headers = {
      Accept: 'application/json'
      // 'Content-Type': 'application/json'
    };
  }

  // add optional AbortSignal option to abort running request and ignore its result
  if (options) {
    requestParams = { ...requestParams, ...options };
  }

  requestParams.credentials = 'same-origin';
  requestParams.mode = 'no-cors';
  requestParams.cache = 'no-cache';

  const requestConfig = {
    url: requestUrl,
    method: requestParams.method,
    data: requestParams.body || null,
    headers: requestParams.headers
  };

  return axios.request(requestConfig);
}

/**
 * Api wrapper
 */
export function api(url, action, method, params, options) {
  let reactAction = {};
  if (typeof action === 'string') {
    reactAction.type = action;
  } else {
    reactAction = { ...action };
  }

  return dispatch => {
    dispatch({ ...reactAction, type: `REQUEST_${reactAction.type}` });
    // Get token from localStorage
    return apiNative(url, method, params, options)
      .then(
        ({ data }) => {
          dispatch({ ...reactAction, type: `SUCCESS_${reactAction.type}`, payload: data });
          return data;
        },
        error => {
          if (error.status === 500) {
            dispatch(internalServerError('Internal Server Error!'));
          } else if (error.status === 404) {
            dispatch(notFoundError(error.message || 'Not Found Error'));
          } else if (error.status === 400) {
            dispatch(badRequestError(error.message || 'Request error'));
          }

          const errorAction = {
            ...reactAction,
            type: `ERROR_${reactAction.type}`,
            payload: error
          };

          dispatch(errorAction);
          return Promise.reject(error);
        }
      );
  };
}
