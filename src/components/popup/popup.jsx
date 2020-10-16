import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { useMediaQuery } from 'react-responsive';

import Button from '../button';
import Modal from '../modal';

import './popup.scss';

const Popup = ({
  title,
  titleIcon,
  children,
  isShown,
  handleClose,
  buttons,
  size,
  titleClasses,
  footerClasses
}) => {
  const isMobileDevice = useMediaQuery({
    maxWidth: '767px'
  });

  return (
    <Modal
      show={isShown}
      modalClass={size}
      onClose={handleClose}>
      <div className={classNames('gl-popup__title-wrapper',
        titleClasses, { mobile: isMobileDevice })}>
        {titleIcon}
        {title}
      </div>
      <div className='gl-popup__content'>
        {children}
      </div>
      {buttons && !!buttons.length && (
        <div className={classNames('gl-popup-footer',
          footerClasses, { mobile: isMobileDevice })}>
          {buttons.map(({
            onClick,
            type,
            label,
            disabled,
            className = ''
          }) => (
            <Button
              size={isMobileDevice ? 'md' : 'lg'}
              key={label}
              onClick={onClick}
              disabled={disabled}
              type={type}
              classNames={className}>
              {label}
            </Button>
          ))}
        </div>
      )}
    </Modal>
  );
};

Popup.defaultProps = {
  buttons: [{
    label: 'Ok',
    type: 'primary',
    onClick: undefined
  }],
  handleClose: undefined,
  title: '',
  titleIcon: null,
  styles: {},
  titleClasses: '',
  footerClasses: '',
  size: 'sm'
};

Popup.propTypes = {
  /**
   * array of ActionButtons.
   */
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.oneOf([
      'primary',
      'default',
      'secondary'
    ]),
    onClick: PropTypes.func
  })),
  /**
   * Content of dialog.
   */
  children: PropTypes.node.isRequired,
  /**
   * handler for close.
   */
  handleClose: PropTypes.func,
  /**
   * Set status of dialog (opened or closed).
   */
  isShown: PropTypes.bool.isRequired,
  /**
   * Title of dialog.
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  size: PropTypes.oneOf([
    'sm',
    'md',
    'lg',
    'xl'
  ]),
  /**
   * Icon of dialog
   */
  titleIcon: PropTypes.node,
  styles: PropTypes.shape({}),
  titleClasses: PropTypes.string,
  footerClasses: PropTypes.string
};

export default Popup;
