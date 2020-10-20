import { createSelector } from 'reselect';
import intersection from 'lodash.intersection';
import { getSelectedCity } from './city';
import { getGender } from '../helpers/common';

const EMPTY_OBJECT = Object.create(null);
const EMPTY_ARRAY = [];

export const getDataFromStore = state => state.library.data || EMPTY_OBJECT;
export const getIsLoading = state => state.library.loading;
export const getIsError = state => state.library.error;

export const getDataByCity = createSelector([
  getDataFromStore,
  getSelectedCity
], (data, city) => {
  const cityData = data[city] || EMPTY_ARRAY;

  return cityData.map(character => ({
    ...character,
    gender: getGender(character)
  }));
});

export const getFilteredData = createSelector([
  getDataByCity,
  state => state.filter
], (data,
  { professions, hairColor, age, weight, height, withFriends, search }) => data.filter(item => {
  let matched = true;

  // Filter by professions
  if (professions.length) {
    if (!intersection(professions, item.professions).length) {
      matched = false;
    }
  }

  // Filter by hair color
  if (hairColor.length) {
    if (!hairColor.includes(item.hair_color)) {
      matched = false;
    }
  }

  // Filter by age
  if (age.from !== null) {
    if (item.age < age.from) {
      matched = false;
    }
  }
  if (age.to !== null) {
    if (item.age > age.to) {
      matched = false;
    }
  }

  // Filter by weight
  if (weight.from !== null) {
    if (item.weight < weight.from) {
      matched = false;
    }
  }
  if (weight.to !== null) {
    if (item.weight > weight.to) {
      matched = false;
    }
  }

  // Filter by height
  if (height.from !== null) {
    if (item.height < height.from) {
      matched = false;
    }
  }
  if (height.to !== null) {
    if (item.height > height.to) {
      matched = false;
    }
  }

  // Filter by friends
  if (withFriends) {
    if (!item.friends.length) {
      matched = false;
    }
  }

  // Filter by search
  if (search) {
    if (!item.name.toLowerCase().startsWith(search.toLowerCase())) {
      matched = false;
    }
  }

  return matched;
}));
