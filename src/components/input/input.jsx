import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import debounce from 'lodash.debounce';

import { Icons } from '../icon';

import { useEventListener, useOnClickOutside } from '../../helpers/hooks';

import './input.scss';

const Input = ({
  onChange,
  onBlur,
  label,
  value,
  error
}) => {
  const inputRef = React.useRef();
  const containerRef = React.useRef();
  const [focused, setFocused] = React.useState(false);
  const [filled, setFilled] = React.useState(!!value);

  const handleClickOutside = React.useCallback(() => {
    if (value) {
      setFilled(true);
    } else {
      setFilled(false);
    }
    setFocused(false);
  }, [value]);

  const handleBlur = React.useCallback(() => {
    if (value) {
      setFilled(true);
    } else {
      setFilled(false);
    }
    setFocused(false);
    if (onBlur) {
      onBlur();
    }
  }, [onBlur, value]);

  const handleKeyUp = React.useCallback(e => {
    if ((e.key === 'Enter' || e.key === 'Escape') && inputRef.current === document.activeElement) {
      inputRef.current.blur();
    }
  }, []);

  useEventListener('keyup', handleKeyUp);
  useOnClickOutside(containerRef, handleClickOutside);
  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  useEffect(() => {
    if (!value && inputRef.current.value) {
      inputRef.current.value = value;
      setFilled(false);
    }
  }, [value]);

  const delayedQuery = useRef(
    debounce(q => onChange(q), 100)
  ).current;

  const handleInput = useCallback(e => {
    delayedQuery(e.target.value);
  }, [delayedQuery]);

  return (
    <div
      ref={containerRef}
      className={clsx('gl-input')}
      // role='textbox'
      // tabIndex={0}
      // onFocus={() => setFocused(true)}
      onClick={() => setFocused(true)}>
      <div className={clsx('gl-input__wrapper', { focused, error: !!error, filled })}>
        <div className='label'>{label}</div>
        <div className='label-placeholder'>Placeholder</div>
        <input
          type='number'
          defaultValue={value}
          ref={inputRef}
          onFocus={() => setFocused(true)}
          className={clsx(({ empty: inputRef?.current?.value === '' || !value }))}
          onBlur={handleBlur}
          onChange={handleInput}
          placeholder='' />
      </div>
      {!!error && (
        <div className='gl-input__status'>
          <div>{Icons.ERROR}</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  );
};

Input.defaultProps = {
  error: null,
  onBlur: undefined,
  value: ''
};

Input.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default Input;
