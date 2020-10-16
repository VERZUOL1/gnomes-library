import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { Icons } from '../icon';
import DropdownSelectItem from './dropdown-select-item';

import { useEventListener, useOnClickOutside } from '../../helpers/hooks';

import './dropdown-select.scss';

const DropdownSelect = ({
  label,
  options,
  selected,
  onChange,
  disabled,
  placeholder,
  error
}) => {
  const optionsRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(selected);

  React.useEffect(() => {
    if (!selectedOption || selected !== selectedOption.value) {
      setSelectedOption(options.find(item => item.value === selected));
    }
  }, [selected, selectedOption, options]);

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

  return (
    <div className='gl-dropdown-select'>
      <div
        className={classNames('gl-dropdown-select__container', {
          disabled,
          hasSelected: !!selectedOption,
          error: !!error,
          open
        })}
        ref={optionsRef}>
        <div
          className={classNames('gl-dropdown-select__control', { open })}
          onClick={() => setOpen(!open)}>
          <div>
            {selectedOption ? selectedOption.label : placeholder}
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
              selected={selectedOption && option.value === selectedOption.value}
              onClick={() => {
                setSelectedOption(option);
                handleClose(false);
                onChange(option);
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

DropdownSelect.defaultProps = {
  selected: null,
  disabled: false,
  placeholder: '',
  label: '',
  error: null
};

DropdownSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default DropdownSelect;
