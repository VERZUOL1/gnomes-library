import { createSelector } from 'reselect';
import { getSelectedCity } from './city';

const EMPTY_OBJECT = Object.create(null);
const EMPTY_ARRAY = [];

export const getDataFromStore = state => state.library.data || EMPTY_OBJECT;
export const getIsLoading = state => state.library.loading;
export const getIsError = state => state.library.error;

export const getDataByCity = createSelector([
  getDataFromStore,
  getSelectedCity
], (data, city) => data[city] || EMPTY_ARRAY);
