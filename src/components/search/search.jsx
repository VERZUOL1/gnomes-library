import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Input from '../input';

// Actions
import { updateFilter } from '../../actions/filter';

// Constants
import { FILTER_TYPES } from '../../constants/filter';

// Selectors
import { getFilters } from '../../selectors/filter';

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector(getFilters);

  return (
    <div>
      <Input
        type='text'
        label='Search'
        value={search}
        onChange={val => dispatch(updateFilter(FILTER_TYPES.SEARCH, val))} />
    </div>
  );
};

export default Search;
