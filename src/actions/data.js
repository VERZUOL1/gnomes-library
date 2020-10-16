import { api } from './api.tp';
import * as EndPoints from '../constants/endpoints.tp';
import { GET_DATA } from '../constants/action-types/data';

export function getData() {
  return dispatch => dispatch(api(
    EndPoints.GET_DATA,
    { type: GET_DATA }
  ));
}
