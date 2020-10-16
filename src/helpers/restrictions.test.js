import { clickIE, clickNS, handler, restrictTouch, setClick } from './restrictions';

test('clickIE should return true', () => {
  expect(clickIE()).toBeTruthy();
});

test('clickNS should return false', () => {
  expect(clickNS({ which: 2 })).toBeFalsy();
});

test('setClick', () => {
  document.layers = true;

  setClick();

  expect(document.onmousedown).toBeTruthy();
});

test('restrictTouch', () => {
  jest.spyOn(window, 'addEventListener');

  restrictTouch();

  expect(window.addEventListener).toHaveBeenCalledTimes(1);
});

test('handler', () => {
  const event = {
    scale: 2,
    preventDefault: jest.fn()
  };
  handler(event);

  expect(event.preventDefault).toBeCalledTimes(1);
});
