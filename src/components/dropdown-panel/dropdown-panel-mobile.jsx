import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';

// Components
import { Icons } from '../icon';

// Helpers
import { useOnClickOutside } from '../../helpers/hooks';
import { interpolation } from '../../helpers/common';

const defaultTiming = { duration: 300, ease: easeQuadOut };

const DropdownPanelMobile = ({ children, onChangeState, minimized, noSearch }) => {
  const contentRef = useRef();
  const toggleRef = useRef();
  const [opened, setOpened] = React.useState(false);

  const handleClose = React.useCallback(e => {
    e.stopPropagation();
    setOpened(false);
  }, [setOpened]);

  React.useLayoutEffect(() => {
    if (onChangeState) {
      onChangeState(opened);
    }
    if (opened) {
      document.querySelector('#root').style.overflow = 'hidden';
    } else {
      document.querySelector('#root').style.overflow = 'auto';
    }
  }, [onChangeState, opened]);

  useOnClickOutside(contentRef, handleClose, toggleRef);

  return (
    <div className='gl-dropdown-panel__container mobile'>
      <div
        className={clsx('gl-dropdown-panel__toggle-wrapper', { opened })}
        ref={toggleRef}>
        {opened
          ? (
            <span
              className='gl-dropdown-panel__toggle-icon-mobile'
              onClick={e => {
                e.stopPropagation();
                setOpened(false);
              }}>
              {Icons.CLOSE}
            </span>
          )
          : (
            <span
              className='gl-dropdown-panel__toggle-icon-mobile'
              onClick={e => {
                e.stopPropagation();
                setOpened(true);
              }}>
              {Icons.FILTER}
            </span>
          )}
      </div>
      {ReactDOM.createPortal(
        <Animate
          show={opened}
          start={{ opacity: 0 }}
          enter={{ opacity: [0.68], timing: defaultTiming }}
          update={{ opacity: [0.68], timing: defaultTiming }}
          leave={{ opacity: [0], timing: defaultTiming }}
          interpolation={interpolation}>
          {({ opacity: op }) => (
            <div
              className={clsx('gl-dropdown-panel-mobile__overlay', { opened })}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{ opacity: op }} />
          )}
        </Animate>,
        document.body
      )}
      {ReactDOM.createPortal(
        <Animate
          show={opened}
          start={{ y: -100 }}
          enter={{
            y: [0],
            timing: defaultTiming
          }}
          update={{
            y: [0],
            timing: defaultTiming
          }}
          leave={[
            {
              y: [-100],
              timing: defaultTiming
            }
          ]}
          interpolation={interpolation}>
          {({ y }) => (
            <div
              ref={contentRef}
              className={clsx('gl-dropdown-panel__mobile-content-wrapper', { minimized, noSearch })}
              style={{ transform: `translate(0, ${y}%)` }}>
              {children}
            </div>
          )}
        </Animate>,
        document.body
      )}
    </div>
  );
};

DropdownPanelMobile.defaultProps = {
  noSearch: false
};

DropdownPanelMobile.propTypes = {
  children: PropTypes.node.isRequired,
  onChangeState: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
  noSearch: PropTypes.bool
};

export default DropdownPanelMobile;
