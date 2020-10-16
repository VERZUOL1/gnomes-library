import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from './input';

describe('Input', () => {
  const cb = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have gl-input class', () => {
    const wrapper = shallow(<Input label='' onChange={cb} value='' />);

    expect(wrapper.hasClass('gl-input')).toBeTruthy();
  });

  it('should handle keyup', () => {
    const blurCb = jest.fn();
    jest.spyOn(React, 'useCallback')
      .mockImplementationOnce(f => f({ stopPropagation: jest.fn(), key: 'Escape' }));
    jest.spyOn(React, 'useRef').mockReturnValue({ current: document.body, blur: blurCb });

    const wrapper = shallow(<Input label='' onChange={jest.fn()} onBlur={cb} value='test' />);

    expect(blurCb).toBeCalledTimes(0);
  });

  it('should handel focus', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    const wrapper = shallow(<Input label='' onChange={jest.fn()} onBlur={cb} value='test' />);
    wrapper.find('input').props().onFocus();
    expect(setState).toBeCalledTimes(1);
  });

  it('should handel focus', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    const wrapper = shallow(<Input label='' onChange={jest.fn()} onBlur={cb} value='test' />);
    wrapper.find('.gl-input').simulate('click');
    expect(setState).toBeCalledTimes(1);
  });

  it('should handle click outside', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    jest.spyOn(React, 'useCallback').mockImplementation(f => f({
      key: 'Escape'
    }));

    jest.spyOn(React, 'useRef').mockReturnValue({ current: document.activeElement });

    const wrapper = shallow(<Input label='' onChange={jest.fn()} onBlur={cb} value='' />);

    expect(setState).toBeCalledTimes(4);
  });

  it('should handle blur', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    jest.spyOn(React, 'useCallback').mockImplementation(f => f({
      key: 'Escape'
    }));

    jest.spyOn(React, 'useRef').mockReturnValue({ current: document.activeElement });

    const wrapper = shallow(<Input label='' onChange={jest.fn()} onBlur={cb} value='' />);

    expect(setState).toBeCalledTimes(4);
  });
});
