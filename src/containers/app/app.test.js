import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import AnimatedSwitch from '../../components/animated-switch';

describe('App', () => {
  it('should render AnimatedSwitch', () => {

    const wrapper = shallow(<App />);

    expect(wrapper.find(AnimatedSwitch)).toHaveLength(1);
  });
});
