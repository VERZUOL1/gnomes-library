import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Animate } from 'react-move';

import DropdownPanelMobile from './dropdown-panel-mobile';

ReactDOM.createPortal = jest.fn(modal => modal);

describe('DropdownPanelMobile', () => {
  it('should be a function', () => {
    expect(typeof DropdownPanelMobile === 'function').toBeTruthy();
  });

  it('should have gl-dropdown-panel__container mobile classes', () => {
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={() => {}}>
        <div />
      </DropdownPanelMobile>
    );

    expect(wrapper.hasClass('gl-dropdown-panel__container')).toBeTruthy();
    expect(wrapper.hasClass('mobile')).toBeTruthy();
  });

  it('should render gl-dropdown-panel__toggle-wrapper', () => {
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={() => {}}>
        <div className='child' />
      </DropdownPanelMobile>
    );

    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper')).toHaveLength(1);
  });

  it('should render portal', () => {
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={() => {}}>
        <div className='child' />
      </DropdownPanelMobile>
    );

    expect(wrapper.find(Animate)).toHaveLength(2);
  });

  it('should handle useLayoutEffect', () => {
    jest.spyOn(document, 'querySelector');
    jest.spyOn(React, 'useLayoutEffect').mockImplementation(f => f());
    const cb = jest.fn();
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={cb}>
        <div className='child' />
      </DropdownPanelMobile>
    );

    expect(cb).toBeCalledTimes(1);
    expect(document.querySelector).toBeCalledTimes(1);
  });

  it('should call setOpened', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={cb}>
        <div className='child' />
      </DropdownPanelMobile>
    );

    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    wrapper.find('.gl-dropdown-panel__toggle-icon-mobile').simulate('click', event);
    expect(wrapper.find('.gl-dropdown-panel__toggle-wrapper.opened')).toHaveLength(1);
    expect(event.stopPropagation).toBeCalledTimes(1);
  });

  it('should handle close', () => {
    const cb = jest.fn();
    jest.spyOn(React, 'useCallback').mockImplementation(f => f({ stopPropagation: jest.fn() }));
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(
      <DropdownPanelMobile minimized onChangeState={cb}>
        <div className='child' />
      </DropdownPanelMobile>
    );

    expect(setState).toBeCalledTimes(1);
  })
});

