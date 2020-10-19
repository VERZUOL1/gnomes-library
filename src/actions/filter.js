import { UPDATE_FILTER, REMOVE_FILTERS } from '../constants/action-types/filter';

/** Updates filter in store */
export function updateFilter(filterType, value, field) {
  return {
    type: UPDATE_FILTER,
    filterType,
    field,
    payload: value
  };
}

export function removeAllFilters() {
  return {
    type: REMOVE_FILTERS
  };
}
