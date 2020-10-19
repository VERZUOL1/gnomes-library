import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Icons } from '../icon';
import DropdownSelectItem from './dropdown-select-item';
import { useEventListener, useOnClickOutside } from '../../helpers/hooks';

import './dropdown-select.scss';

const DropdownSelectMultiple = ({
  label,
  options,
  onChange,
  selected,
  disabled,
  placeholder,
  error,
  max
}) => {
  const optionsRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(
    options.filter(item => selected.includes(item.value))
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleKeyUp = React.useCallback(e => {
    if ((e.key === 'Enter' || e.key === 'Escape') && optionsRef.current === document.activeElement) {
      setOpen(true);
    }
  }, [optionsRef]);

  useOnClickOutside(optionsRef, handleClose);
  useEventListener('keyup', handleKeyUp);

  React.useEffect(() => {
    const diff = selectedOption.filter(item => selected.includes(item.value));
    if (!diff.length && selectedOption.length) {
      setSelectedOption(diff);
    }
  }, [selected, selectedOption]);

  return (
    <div className='gl-dropdown-select'>
      <div
        className={classNames('gl-dropdown-select__container', {
          disabled,
          hasSelected: !!selectedOption.length,
          error: !!error,
          open
        })}
        ref={optionsRef}>
        <div
          className={classNames('gl-dropdown-select__control', { open })}
          onClick={() => setOpen(!open)}>
          <div>
            {
              selectedOption.length
                ? (
                  selectedOption.map(item => item.label).join(', ')
                )
                : placeholder
            }
          </div>
          { label && <div className='gl-dropdown-select__label'>{label}</div> }
          <div className={classNames('control-toggle', { open })}>
            { Icons.CHEVRON_DOWN }
          </div>
        </div>
        <div className={classNames('gl-dropdown-select__options', { open })}>
          {options.map(option => (
            <DropdownSelectItem
              key={option.value}
              label={option.label}
              value={option.value}

              selected={selectedOption && selectedOption.includes(option)}
              onClick={() => {
                if (selected.includes(option.value)) {
                  setSelectedOption(selectedOption.filter(item => item.value !== option.value));
                  onChange(selected.filter(item => item !== option.value));
                } else {
                  setSelectedOption([...selectedOption, option].reverse().slice(0, max).reverse());
                  onChange([...selected, option.value].reverse().slice(0, max).reverse());
                }
              }} />
          ))}
        </div>
      </div>
      {!!error && (
        <div className='bc__status'>
          <div>{Icons.ERROR}</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  );
};

DropdownSelectMultiple.defaultProps = {
  selected: [],
  disabled: false,
  placeholder: '',
  label: '',
  error: null,
  max: 3
};

DropdownSelectMultiple.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  max: PropTypes.number
};

export default DropdownSelectMultiple;
