import React from 'react';
import { shallow } from 'enzyme';
import Icon from './icon';

describe('Icon', () => {
  it('should have gl-icon class as wrapper', () => {
    const wrapper = shallow(<Icon name='LOGO' />);

    expect(wrapper.hasClass('gl-icon')).toBeTruthy();
  });
});
