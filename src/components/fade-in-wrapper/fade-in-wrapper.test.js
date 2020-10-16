import React from 'react';
import { shallow } from 'enzyme';
import { Animate } from 'react-move';
import FadeInWrapper from './fade-in-wrapper';

const callback = jest.fn();

it('should render Animate component', () => {
  const wrapper = shallow(<FadeInWrapper><div /></FadeInWrapper>);

  expect(wrapper.find(Animate)).toBeTruthy();
});
