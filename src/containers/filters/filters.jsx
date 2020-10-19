import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Selectors
import { getFiltersOptions, getFilters } from '../../selectors/filter';

// Actions
import { updateFilter, removeAllFilters } from '../../actions/filter';

// Constants
import { FILTER_TYPES } from '../../constants/filter';

// Components
import { DropdownSelectMultiple } from '../../components/dropdown-select';
import Input from '../../components/input';
import Checkbox from '../../components/checkbox';
import Button from '../../components/button';

import './filters.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const { professionsOptions, hairColorOptions } = useSelector(getFiltersOptions);
  const { professions, hairColor, age, weight, height, withFriends } = useSelector(getFilters);

  const handleChangeProfession = useCallback(selected => {
    dispatch(updateFilter(FILTER_TYPES.PROFESSIONS, selected));
  }, [dispatch]);

  const handleChangeHairColor = useCallback(selected => {
    dispatch(updateFilter(FILTER_TYPES.HAIR_COLOR, selected));
  }, [dispatch]);

  const handleChangeAge = useCallback((field, val) => {
    dispatch(updateFilter(FILTER_TYPES.AGE, val, field));
  }, [dispatch]);

  const handleChangeWeight = useCallback((field, val) => {
    dispatch(updateFilter(FILTER_TYPES.WEIGHT, val, field));
  }, [dispatch]);

  const handleChangeHeight = useCallback((field, val) => {
    dispatch(updateFilter(FILTER_TYPES.HEIGHT, val, field));
  }, [dispatch]);

  return (
    <div className='gl-filters__wrapper'>
      <h2 className='grid-title'>Filters</h2>
      <div className='grid-button'>
        <Button onClick={() => dispatch(removeAllFilters())} label='Remove all filters' />
      </div>
      <div className='grid-dropdown-prof'>
        <DropdownSelectMultiple
          max={1000}
          onChange={handleChangeProfession}
          options={professionsOptions}
          selected={professions}
          label='Profession' />
      </div>
      <div className='grid-dropdown-color'>
        <DropdownSelectMultiple
          max={1000}
          onChange={handleChangeHairColor}
          options={hairColorOptions}
          selected={hairColor}
          label='Hair color' />
      </div>
      <div className='grid-dropdown-age'>
        <h3>Age</h3>
        <Input
          label='From'
          onChange={val => handleChangeAge('from', val)}
          value={age.from} />
        <Input
          label='To'
          onChange={val => handleChangeAge('to', val)}
          value={age.to} />
      </div>
      <div className='grid-dropdown-weight'>
        <h3>Weight</h3>
        <Input
          label='From'
          onChange={val => handleChangeWeight('from', val)}
          value={weight.from} />
        <Input
          label='To'
          onChange={val => handleChangeWeight('to', val)}
          value={weight.to} />
      </div>
      <div className='grid-dropdown-height'>
        <h3>Height</h3>
        <Input
          label='From'
          onChange={val => handleChangeHeight('from', val)}
          value={height.from} />
        <Input
          label='To'
          onChange={val => handleChangeHeight('to', val)}
          value={height.to} />
      </div>
      <div className='grid-checkbox'>
        <Checkbox
          label='Only show gnomes with friends'
          checked={withFriends}
          onChange={val => {
            dispatch(updateFilter(FILTER_TYPES.WITH_FRIENDS, val));
          }} />
      </div>
    </div>
  );
};

export default Filters;
