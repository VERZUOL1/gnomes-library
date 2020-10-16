import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from './modal';

describe('Modal' , () => {
  it('should be a function', () => {
    expect(typeof Modal).toEqual('function');
  });

  it('should prevent default on click', () => {
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    const wrapper = mount(<Modal show><div /></Modal>);

    wrapper.find('.modal__content').simulate('click', { preventDefault, stopPropagation });

    expect(preventDefault).toBeCalledTimes(1);
    expect(stopPropagation).toBeCalledTimes(1);
  });

  it('should handle key press', () => {
    const cb = jest.fn();

    jest.spyOn(React, 'useCallback')
      .mockImplementation(f => f({ stopPropagation: jest.fn(), key: 'Escape' }));

    const wrapper = shallow(<Modal onClose={cb} show><div /></Modal>);

    expect(cb).toBeCalledTimes(1);
  });
});
