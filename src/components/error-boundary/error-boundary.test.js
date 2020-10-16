import React from 'react';
import { shallow } from 'enzyme';
import { ErrorBoundary } from './error-boundary';

const Something = () => <div className='children' />;

describe('Error boundary component', () => {
  it('should render wrapped component as is', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );

    expect(wrapper.find(Something)).toHaveLength(1);
  });

  it('should have an error triggered in case of error in wrapped component', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );

    const error = new Error('test');

    wrapper.find(Something).simulateError(error);

    expect(wrapper.state()).toMatchObject({
      error,
      hasError: true
    });
  });
});
