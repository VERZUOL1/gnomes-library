import { removeAllFilters, updateFilter } from './filter';
import { FILTER_TYPES } from '../constants/filter';
import { REMOVE_FILTERS, UPDATE_FILTER } from '../constants/action-types/filter';

describe('Filter', () => {
  it('should create action on updateFilter', () => {
    const expected = {
      type: UPDATE_FILTER,
      filterType: FILTER_TYPES.PROFESSIONS,
      field: undefined,
      payload: ['Tailor']
    };
    expect(updateFilter(FILTER_TYPES.PROFESSIONS, ['Tailor'])).toEqual(expected);
  });

  it('should create action on removeFilters', () => {
    const expected = {
      type: REMOVE_FILTERS
    };
    expect(removeAllFilters()).toEqual(expected);
  });
});
