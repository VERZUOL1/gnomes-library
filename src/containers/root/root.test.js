import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import Root from './root';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';

describe('Root', () => {
  it('should render ErroBoundary', () => {
    const wrapper = shallow(<Root />);

    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
  });
  it('should render Route', () => {
    const wrapper = shallow(<Root />);

    expect(wrapper.find(Route)).toHaveLength(1);
  });
});
