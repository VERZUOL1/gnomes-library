import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './navbar.scss';

const Navbar = ({ visible }) => (
  <div
    className={clsx('gl-navbar', { visible })}>
    <span>
      Navbar here
    </span>
  </div>
);

Navbar.defaultProps = {
  visible: true
};

Navbar.propTypes = {
  visible: PropTypes.bool
};

export default Navbar;
