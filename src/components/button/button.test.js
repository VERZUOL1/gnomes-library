import React from 'react';
import { shallow } from 'enzyme';
import Button from './button';

const onClickHandler = jest.fn();

/**
 * mock data
 */
const emptyCallback = () => undefined;
const label = 'Button label';

describe('Button', () => {
  beforeEach(() => {
    onClickHandler.mockClear();
  });

  it('Button should contain general gl-button class ', () => {
    const wrapper = shallow(
      <Button
        label={label}
        onClick={emptyCallback} />);

    expect(wrapper.hasClass('gl-button')).toBeTruthy();
  });

  it('Button should be disabled if it was configured', () => {
    const wrapper = shallow(
      <Button
        label={label}
        disabled={true}
        onClick={emptyCallback} />);

    expect(wrapper.hasClass('disabled')).toBeTruthy();
  });

  it('Button should be change size if it was configured', () => {
    const wrapper = shallow(
      <Button
        label={label}
        size='xs'
        onClick={emptyCallback} />);

    expect(wrapper.hasClass('xs')).toBeTruthy();
  });

  it('Button should execute callback function on click', () => {
    const wrapper = shallow(
      <Button
        label={label}
        onClick={onClickHandler} />);

    wrapper.simulate('click', { });

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it('Button should render configured label as is', () => {
    const wrapper = shallow(
      <Button
        label={label}
        onClick={emptyCallback} />);

    expect(wrapper.text()).toEqual(label);
  });

  it('Button should not execute callback if disabled', () => {
    const wrapper = shallow(
      <Button
        label={label}
        disabled
        onClick={onClickHandler}>
        Press me
      </Button>
    );

    wrapper.simulate('click', { });

    expect(onClickHandler).toHaveBeenCalledTimes(0);
  });

  it('Button handle keyup not execute callback if disabled', () => {
    const cb = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValue({ current: document.activeElement });
    jest.spyOn(React, 'useCallback').mockImplementation(f => f({ key: 'Enter'}));

    const wrapper = shallow(
      <Button
        label={label}
        disabled
        onClick={cb}>
        <span>Press me</span>
      </Button>
    );

    expect(cb).toHaveBeenCalledTimes(1);
  });
});
