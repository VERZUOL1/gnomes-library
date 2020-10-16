import React from 'react';
import PropTypes from 'prop-types';

import Icons from './icons';

/**
 * Icon component.
 */
const Icon = ({ name, size }) => (
  <div className='gl-icon' style={{ width: `${size}px`, height: `${size}px` }}>
    {Icons[name]}
  </div>
);

Icon.defaultProps = {
  size: 24
};

Icon.propTypes = {
  /**
   * Name of Icon
   */
  name: PropTypes.string.isRequired,
  /**
   * Size of Icon
   */
  size: PropTypes.number
};

export default Icon;
