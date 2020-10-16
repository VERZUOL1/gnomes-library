import React from 'react';
import { mount, shallow } from 'enzyme';
import { Animate } from 'react-move';

import ZoomInWrapper from './zoom-in-wrapper';

describe('ZoomInWrapper', () => {
  it('should be a function', () => {
    expect(typeof ZoomInWrapper === 'function')
      .toBeTruthy();
  });

  it('should render Animate component', () => {
    const wrapper = shallow(<ZoomInWrapper><div /></ZoomInWrapper>);

    expect(wrapper.find(Animate)).toHaveLength(1);
  });

  it('should render children as is', () => {
    const wrapper = mount(<ZoomInWrapper show><div className='child-node'/></ZoomInWrapper>);

    expect(wrapper.find('.child-node')).toHaveLength(1);
  });
});
