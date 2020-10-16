import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import shortId from 'shortid';

import './checkbox.scss';

const Checkbox = ({
  label,
  disabled,
  name,
  customLabel,
  checked,
  onChange
}) => {
  const id = useRef(shortId.generate()).current;
  const checkboxClassModifiers = clsx(
    'gl-checkbox',
    { 'gl-checkbox-checked': checked },
    { 'gl-checkbox-disabled': disabled }
  );

  return (
    <div className={checkboxClassModifiers}>
      <input
        disabled={disabled}
        defaultChecked={checked}
        type='checkbox'
        name={name}
        id={id} />
      <label htmlFor={id} title={label} onClick={() => !disabled && onChange(!checked)}>
        <span>
          <span>
            <span className='checked-icon'>
              <span />
            </span>
          </span>
        </span>
        <span className='label'>{customLabel || label}</span>
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  name: 'checkbox',
  customLabel: null
};

Checkbox.propTypes = {
  /**
   * Indicates checkbox state checked/unchecked
   */
  checked: PropTypes.bool,
  /**
   * Set button as disabled
   */
  disabled: PropTypes.bool,
  /**
   * Text to be displayed as radio button label
   */
  label: PropTypes.string.isRequired,
  /**
   * Name of checkbox
   */
  name: PropTypes.string,
  /**
   * OnChange handler
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Custom label element
   */
  customLabel: PropTypes.node
};

export default Checkbox;
