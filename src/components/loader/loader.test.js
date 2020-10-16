import React from 'react';
import { shallow, mount } from 'enzyme';
import { Animate } from 'react-move';
import Loader from './loader';

describe('Loader', () => {
  it('should render Animate component', () => {
    const wrapper = shallow(<Loader show />);

    expect(wrapper.find(Animate)).toHaveLength(1);
  });

  it('should prevent default on click', () => {
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    const wrapper = mount(<Loader show />);

    wrapper.find('.gl-loader__container').simulate('click', { preventDefault, stopPropagation });

    expect(preventDefault).toBeCalledTimes(1);
    expect(stopPropagation).toBeCalledTimes(1);
  });
});
