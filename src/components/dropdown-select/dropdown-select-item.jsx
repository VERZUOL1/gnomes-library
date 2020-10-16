import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const DropdownSelectItem = ({
  label,
  selected,
  value,
  onClick
}) => (
  <div
    role='menuitem'
    tabIndex={0}
    className={classNames('gl-dropdown-select__option', { selected })}
    onKeyUp={e => {
      if (e.key === 'Enter') {
        onClick(value);
      }
    }}
    onClick={() => onClick(value)}>
    {label}
  </div>
);

DropdownSelectItem.defaultProps = {
  selected: false
};

DropdownSelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default DropdownSelectItem;
