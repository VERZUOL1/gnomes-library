import React from 'react';
import { shallow, mount } from 'enzyme';

import DropdownPanelOriginal from './dropdown-panel-original';

describe('DropdownPanelOriginal', () => {
  it('should be a function', () => {
    expect(typeof DropdownPanelOriginal === 'function').toBeTruthy();
  });

  it('should have gl-dropdown-panel__container class', () => {
    const wrapper = shallow(
      <DropdownPanelOriginal label=''>
        <div />
      </DropdownPanelOriginal>
    );

    expect(wrapper.hasClass('gl-dropdown-panel__container')).toBeTruthy();
  });

  it('should render gl-dropdown-panel__toggle-wrapper', () => {
    const wrapper = shallow(
      <DropdownPanelOriginal label='Test'>
        <div className='child' />
      </DropdownPanelOriginal>
    );

    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper')).toHaveLength(1);
  });

  it('should toggle open state', () => {
    const wrapper = mount(
      <DropdownPanelOriginal label='Test'>
        <div className='child' />
      </DropdownPanelOriginal>
    );

    wrapper.find('.gl-dropdown-panel__toggle-wrapper').simulate('click');

    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper.opened')).toHaveLength(1);
  });
});
