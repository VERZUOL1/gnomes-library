import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/loader';
import App from './app';
import AnimatedSwitch from '../../components/animated-switch';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(null)
    .mockReturnValueOnce([])
    .mockReturnValueOnce([])
    .mockReturnValueOnce([]),
  useDispatch: jest.fn()
}));

describe('App', () => {
  it('should render AnimatedSwitch when have data', () => {

    const wrapper = shallow(<App />);

    expect(wrapper.find(AnimatedSwitch)).toHaveLength(1);
  });
});
