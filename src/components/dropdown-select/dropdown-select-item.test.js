import React from 'react';
import { shallow } from 'enzyme';
import DropdownSelectItem from './dropdown-select-item';

describe('Dropdown select item', () => {
  it('should render element with gl-dropdown-select__option class', () => {
    const cb = jest.fn();
    const wrapper = shallow(<DropdownSelectItem label='Jason' onClick={cb} value={1} />);

    expect(wrapper.hasClass('gl-dropdown-select__option')).toBeTruthy();
  });

  it('should call callback once on click', () => {
    const cb = jest.fn();
    const wrapper = shallow(<DropdownSelectItem label='Jason' onClick={cb} value={1} />);

    wrapper.simulate('click');
    expect(cb).toBeCalledTimes(1);
  });

  it('should call callback once on key', () => {
    const cb = jest.fn();
    const wrapper = shallow(<DropdownSelectItem label='Jason' onClick={cb} value={1} selected={false} />);

    wrapper.props().onKeyUp({ key: 'Enter' });
    expect(cb).toBeCalledTimes(1);
  });
});
