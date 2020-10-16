import React from 'react';
import { shallow } from 'enzyme';
import DropdownPanel from './dropdown-panel';
import DropdownPanelOriginal from './dropdown-panel-original';

describe('DropdownPanel', () => {
  it('should render DropdownPanelOriginal by default', () => {
    const wrapper = shallow(
      <DropdownPanel label='Test'>
        <div />
      </DropdownPanel>
    );

    expect(wrapper.find(DropdownPanelOriginal)).toHaveLength(1);
  })
});
