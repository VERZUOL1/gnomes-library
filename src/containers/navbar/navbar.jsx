import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

// Components
import DropdownPanel from '../../components/dropdown-panel';
import Filters from '../filters';

// Selectors
import { getSelectedCity } from '../../selectors/city';

// Styles
import './navbar.scss';

const Navbar = ({ visible }) => {
  const cityName = useSelector(getSelectedCity);

  return (
    <div
      className={clsx('gl-navbar', { visible })}>
      <div className='gl-navbar-content'>
        <div className='gl-app-title'>{cityName}</div>
        <div>
          <DropdownPanel label='Filters'>
            <Filters />
          </DropdownPanel>
        </div>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  visible: true
};

Navbar.propTypes = {
  visible: PropTypes.bool
};

export default Navbar;
