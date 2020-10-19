import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import {
  useOnClickOutside,
  useScrollTop,
  useIntersect,
  useEventListener,
  useForceUpdate
} from './hooks';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

jest.mock("connected-react-router", () => ({
  push: jest.fn()
}));

describe("Data loader hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('useScrollTop', () => {
    const querySelectorSpy = jest.spyOn(document, 'querySelector');
    querySelectorSpy.mockImplementation(() => ({ scrollIntoView: jest.fn() }));

    renderHook(() => useScrollTop());

    expect(querySelectorSpy).toBeCalledTimes(1);
  });

  test('useScrollTop with element', () => {
    const querySelectorSpy = jest.spyOn(document, 'querySelector');
    querySelectorSpy.mockImplementation(() => ({ scrollIntoView: jest.fn() }));

    renderHook(() => useScrollTop(null, document.body));

    expect(querySelectorSpy).toBeCalledTimes(1);
  });

  test('useOnClickOutside', () => {
    jest.spyOn(document, 'removeEventListener');
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    renderHook(() => {
      const handler = jest.fn();
      useOnClickOutside(
        { current: document.createElement('div') },
        handler,
        { current: document.createElement('div')}
      );
    });
  });

  test('useIntersect', () => {
    jest.spyOn(React, 'useRef')
      .mockImplementation(() => ({ current: document.createElement('div')}));
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect
    }));
    renderHook(() => {
      useIntersect({ root: null, rootMargin: '0px 0px 0px 0px', threshold: '0, 1'});
    });
    expect(observe).toHaveBeenCalledTimes(1);
  });

  test('useEventListenr', () => {
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const handler = jest.fn();
    renderHook(() => {
      useEventListener('click', handler);
    });
    expect(document.addEventListener).toBeCalledTimes(0);
  });

  test('useEventListenr no elem', () => {
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const handler = jest.fn();
    renderHook(() => {
      useEventListener('click', handler, {});
    });
    expect(document.addEventListener).toBeCalledTimes(0);
  });

  test('useForceUpdate', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const spyUseCallback = jest.fn();
    jest.spyOn(React, 'useCallback').mockImplementation(() => spyUseCallback);

    renderHook(() => {
      useForceUpdate('portrait');
    });
    expect(spyUseCallback).toBeCalledTimes(1);
  });
});
