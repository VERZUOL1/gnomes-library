import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';

// Components
import { Icons } from '../icon';

// Helpers
import { useOnClickOutside } from '../../helpers/hooks';
import { interpolation } from '../../helpers/common';

import './dropdown-panel.scss';

const DropdownPanel = ({ children }) => {
  const contentRef = useRef();
  const [opened, setOpened] = useState(false);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, [setOpened]);

  useOnClickOutside(contentRef, handleClose);

  return (
    <div className='gl-dropdown-panel__container' ref={contentRef}>
      <div
        className={clsx('gl-dropdown-panel__toggle-wrapper', { opened })}
        onClick={() => setOpened(!opened)}>
        <span className='gl-dropdown-panel__toggle-label'>
          {Icons.GEARS}
        </span>
      </div>
      <Animate
        show={opened}
        start={{ opacity: 0 }}
        enter={{
          opacity: [1],
          timing: { duration: 500, delay: 0, ease: easeQuadOut }
        }}
        update={{
          opacity: [1],
          timing: { duration: 500, ease: easeQuadOut, delay: 0 }
        }}
        leave={[
          {
            opacity: [0],
            timing: { delay: 300, duration: 500, ease: easeQuadOut }
          }
        ]}
        interpolation={interpolation}>
        {({ opacity }) => (
          <div className='gl-dropdown-panel__content-wrapper' style={{ opacity }}>
            {children}
          </div>
        )}
      </Animate>
    </div>
  );
};

DropdownPanel.propTypes = {
  children: PropTypes.node.isRequired
};

export default DropdownPanel;
