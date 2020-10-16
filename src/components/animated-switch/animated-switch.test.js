import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import { AnimatedSwitch } from './animated-switch';

describe('AnimatedSwitch', () => {
  it('should be a function', () => {
    expect(typeof AnimatedSwitch === 'function').toBeTruthy();
  });

  it('should render TransitionGroup component', () => {
    const wrapper = shallow(
      <AnimatedSwitch location={{}}>
        <Route
          path='/'
          component={() => <div />} />
        <Route
          path='/'
          component={() => <div />} />
      </AnimatedSwitch>
    );

    expect(wrapper.find(TransitionGroup)).toHaveLength(1);
  });
});
