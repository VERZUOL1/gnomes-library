import React from 'react';
import { shallow } from 'enzyme';
import ResponsiveImage from './responsive-image';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('ResponsiveImage', () => {
  const onLoad = jest.fn().mockImplementation(f => f());
  window.Image = jest.fn(() => ({
    onLoad
  }));
  it('should handle useEffect', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const wrapper = shallow(
      <ResponsiveImage src='' thumbSrc='' visible className='' />
    );
    wrapper.unmount();
  });
});
