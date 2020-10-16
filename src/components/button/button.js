import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

import { useEventListener } from '../../helpers/hooks';

const Button = ({
  label,
  classNames,
  disabled,
  theme,
  onClick,
  children,
  type,
  size
}) => {
  const buttonRef = React.useRef();
  /**
   * Generate button content.
   * If no children provided label property will be shown
   */
  const buttonContent = () => {
    if (!children) {
      return <span className='label'>{label}</span>;
    }
    return React.isValidElement(children) ? children : <span className='label'>{children}</span>;
  };

  const handleKeyUp = React.useCallback(e => {
    if (e.key === 'Enter' && buttonRef.current === document.activeElement) {
      onClick(e);
    }
  }, [buttonRef, onClick]);

  useEventListener('keyup', handleKeyUp);

  return (
    <div
      className={clsx('gl-button', theme, type, classNames, size, {
        disabled
      })}
      ref={buttonRef}
      role='button'
      tabIndex={0}
      onClick={!disabled ? onClick : undefined}>
      <div className='gl-button_background' />
      { buttonContent() }
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
  classNames: '',
  theme: 'default',
  type: 'primary',
  children: null,
  label: '',
  size: 'auto'
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  classNames: PropTypes.string,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.oneOf([
    'primary', 'secondary'
  ]),
  size: PropTypes.oneOf([
    'xs', 'sm', 'md', 'lg', 'xl', 'auto'
  ])
};

export default Button;
