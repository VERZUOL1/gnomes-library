import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { easeQuadOut } from 'd3-ease';
import { Animate } from 'react-move';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';

// Components
import { Icons } from '../icon';

// Helpers
import { interpolation } from '../../helpers/common';

// Styles
import './modal.scss';

const Modal = ({
  onClose,
  children,
  show
}) => {
  const isMobileDevice = useMediaQuery({
    maxWidth: '767px'
  });

  const handleEsc = React.useCallback(e => {
    if (e.key === 'Escape' && onClose) {
      onClose(e);
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keyup', handleEsc);

    return () => { document.removeEventListener('keyup', handleEsc); };
  }, [handleEsc]);

  return ReactDOM.createPortal(
    <Animate
      show={show}
      start={{ opacity: 0 }}
      enter={{
        opacity: [1],
        timing: { duration: 300, delay: 0, ease: easeQuadOut }
      }}
      update={{
        opacity: [1],
        timing: { duration: 300, ease: easeQuadOut, delay: 100 }
      }}
      leave={[
        {
          opacity: [0],
          timing: { delay: 300, duration: 300, ease: easeQuadOut }
        }
      ]}
      interpolation={interpolation}>
      {({ opacity }) => (
        <div
          onClick={onClose}
          className={clsx('modal', { mobile: isMobileDevice })}
          style={{ opacity }}>
          <Animate
            show={show}
            start={{ opacity: 0 }}
            enter={{
              opacity: [1],
              timing: { duration: 300, delay: 300, ease: easeQuadOut }
            }}
            update={{
              opacity: [1],
              timing: { duration: 300, ease: easeQuadOut, delay: 100 }
            }}
            leave={[
              {
                opacity: [0],
                timing: { delay: 0, duration: 300, ease: easeQuadOut }
              }
            ]}
            interpolation={interpolation}>
            {({ opacity: op }) => (
              <div
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className={clsx('modal__content', { mobile: isMobileDevice })}
                style={{ opacity: op }}>
                <div className='modal__close-wrapper' onClick={onClose}>
                  <span className='icon'>{ Icons.CLOSE }</span>
                </div>
                {children}
              </div>
            )}
          </Animate>
        </div>
      )}
    </Animate>,
    document.body
  );
};

Modal.defaultProps = {
  modalClass: '',
  onClose: undefined
};

Modal.propTypes = {
  modalClass: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Modal;
