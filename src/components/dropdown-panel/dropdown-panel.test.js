import React from 'react';
import { shallow, mount } from 'enzyme';

import DropdownPanel from './dropdown-panel';

describe('DropdownPanelOriginal', () => {
  it('should be a function', () => {
    expect(typeof DropdownPanel === 'function').toBeTruthy();
  });

  it('should have gl-dropdown-panel__container class', () => {
    const wrapper = shallow(
      <DropdownPanel label=''>
        <div />
      </DropdownPanel>
    );

    expect(wrapper.hasClass('gl-dropdown-panel__container')).toBeTruthy();
  });

  it('should render gl-dropdown-panel__toggle-wrapper', () => {
    const wrapper = shallow(
      <DropdownPanel label='Test'>
        <div className='child' />
      </DropdownPanel>
    );

    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper')).toHaveLength(1);
  });

  it('should toggle open state', () => {
    const wrapper = mount(
      <DropdownPanel label='Test'>
        <div className='child' />
      </DropdownPanel>
    );

    wrapper.find('.gl-dropdown-panel__toggle-wrapper').simulate('click');

    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper.opened')).toHaveLength(1);
  });
});
