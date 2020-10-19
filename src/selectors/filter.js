import { createSelector } from 'reselect';
import { getDataByCity } from './library';

export const getFiltersOptions = createSelector([
  getDataByCity
], data => {
  const availableProfessions = new Set();
  const availableHairColors = new Set();
  data.forEach(character => {
    character.professions.forEach(item => availableProfessions.add(item));
    availableHairColors.add(character.hair_color);
  });

  return {
    professionsOptions: Array.from(availableProfessions)
      .map(item => ({ label: item, value: item })),
    hairColorOptions: Array.from(availableHairColors)
      .map(item => ({ label: item, value: item }))
  };
});

export const getFilters = state => state.filter;
