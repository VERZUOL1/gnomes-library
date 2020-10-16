import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './index';

const onChangeHandler = jest.fn();

/**
 * mock data
 */
const emptyCallback = () => undefined;
const label = 'Checkbox label';
const name = 'test';

describe('Checkbox', () => {
  beforeEach(() => {
    onChangeHandler.mockClear();
  });

  it('Checkbox should contain general gl-checkbox class', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        onChange={emptyCallback} />);

    expect(wrapper.hasClass('gl-checkbox')).toBeTruthy();
  });

  it('Checkbox should contain gl-checkbox-checked class', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        onChange={emptyCallback}
        checked />);

    expect(wrapper.hasClass('gl-checkbox-checked')).toBeTruthy();
  });

  it('Checkbox should render configured label as is', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        onChange={emptyCallback} />);

    expect(wrapper.find('label')
      .text()).toEqual(label);
  });


  it('Checkbox should execute callback function on change', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        onChange={onChangeHandler} />);

    wrapper.find('label')
      .simulate('click', { target: { value: true } });

    expect(onChangeHandler).toHaveBeenCalledTimes(1);
  });

  it('Checkbox should be disabled if it was configured', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        disabled
        onChange={emptyCallback} />);

    expect(wrapper.hasClass('gl-checkbox-disabled')).toBeTruthy();
  });


  it('Checkbox should not execute callback if disabled', () => {
    const wrapper = shallow(
      <Checkbox
        label={label}
        name={name}
        disabled={true}
        onChange={onChangeHandler} />);

    wrapper.find('label')
      .simulate('click', { target: { value: 1 } });

    expect(onChangeHandler).toHaveBeenCalledTimes(0);
  });
});
