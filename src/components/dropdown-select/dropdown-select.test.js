import React from 'react';
import { shallow } from 'enzyme';
import DropdownSelect from './dropdown-select';
import DropdownSelectItem from './dropdown-select-item';

describe('Dropdown select', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const cb = jest.fn();
  const options = [{ label: 'Jason', value: 1 }, { label: 'Born', value: 2 }];

  it('should have gl-dropdown-select class as wrapper', () => {
    const wrapper = shallow(<DropdownSelect onChange={cb} options={options} />);

    expect(wrapper.find('.gl-dropdown-select')).toHaveLength(1);
  });

  it('should open options list on toggle click', () => {
    const wrapper = shallow(<DropdownSelect onChange={cb} options={options} />);

    wrapper.find('.gl-dropdown-select__control').simulate('click');

    expect(wrapper.find('.gl-dropdown-select__options.open')).toBeTruthy();
  });

  it('should call onChange on click item', () => {
    const wrapper = shallow(<DropdownSelect onChange={cb} options={options} />);

    wrapper.find('.gl-dropdown-select__control').simulate('click');

    expect(wrapper.find('.bc-dropdown-select__options.open')).toBeTruthy();

    wrapper.find(DropdownSelectItem).first().props().onClick();

    expect(cb).toBeCalledTimes(1);
  });

  it('should setSelected on mount', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    jest.spyOn(React, 'useEffect').mockImplementation(f => f());

    const wrapper = shallow(<DropdownSelect onChange={cb} options={options} selected={null} />);

    expect(setState).toBeCalledTimes(1);
  });

  it('should handle keyup', () => {
    const setOpen = jest.fn();
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useRef').mockReturnValue({ current: document.activeElement });
    jest.spyOn(React, 'useCallback').mockImplementationOnce(f => f({ key: 'Enter' }));
    const wrapper = shallow(<DropdownSelect onChange={setOpen} options={options} selected={null} />);

    expect(setState).toBeCalledTimes(2);
  });
});
