import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './not-found';
import ReactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('NotFound', () => {
  const dispatch = jest.fn();
  const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch');
  useDispatchSpy.mockImplementation(() => dispatch);

  it('should render not found container', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.hasClass('not-found__container')).toBeTruthy();
  });

  it('should go back on click', () => {
    const wrapper = shallow(<NotFound />);
    wrapper.find('div').last().simulate('click');
    expect(dispatch).toBeCalledTimes(1);
  });
});
