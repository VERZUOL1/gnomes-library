import React from 'react';
import PropTypes from 'prop-types';
import { Responsive } from 'responsive-react';
import { isLaptopDevice, isTabletDevice, isBiggerThanLaptop } from 'responsive-react/dist/utilResponsive';

// Components
import DropdownPanelOriginal from './dropdown-panel-original';
import DropdownPanelMobile from './dropdown-panel-mobile';

// Styles
import './dropdown-panel.scss';

const DropdownPanel = ({ label, children }) => (
  <>
    {(isLaptopDevice() || isBiggerThanLaptop() || isTabletDevice()) && (
      <DropdownPanelOriginal label={label}>
        {children}
      </DropdownPanelOriginal>
    )}
    <Responsive displayIn={['Mobile']}>
      <DropdownPanelMobile label={label} onChangeState={() => {}} minimized>
        {children}
      </DropdownPanelMobile>
    </Responsive>
  </>
);

DropdownPanel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default DropdownPanel;
