import React from 'react';
import { shallow } from 'enzyme';
import Popup from './popup';
import Modal from '../modal';

it('should render modal', () => {
  const wrapper = shallow(<Popup buttons={[]} isShown><div /></Popup>);

  expect(wrapper.find(Modal)).toHaveLength(1);
});

it('should call on close', () => {
  const cb = jest.fn();
  const wrapper = shallow(<Popup isShown buttons={[]} handleClose={cb}><div /></Popup>);

  wrapper.find(Modal).props().onClose();

  expect(cb).toBeCalledTimes(1);
});

it('should render gl-popup__title-wrapper', () => {
  const cb = jest.fn();
  const wrapper = shallow(<Popup isShown    buttons={[]} handleClose={cb}><div /></Popup>);

  expect(wrapper.find('.gl-popup__title-wrapper')).toHaveLength(1);
});

