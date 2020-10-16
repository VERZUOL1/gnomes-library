import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import ReactRedux from 'react-redux';
import {
  useParallaxImages,
  useLazyLoadingImages,
  useLocalStorage,
  useOnClickOutside,
  useScrollTop,
  useMarkerAnimation,
  useIntersect,
  useActiveSectionObserver,
  useEventListener,
  preloadImage,
  handleImagesParallax,
  lazyLoadingImagesHandleEntries,
  parallaxImagesHandleEntries, findDate, markerAnimationCallback, useForceUpdate
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

  test('useLocalStorage should return initialValue from local storage by key', () => {
    renderHook(() => {
      const [value] = useLocalStorage('mockKey', 1);

      expect(value).toEqual(1);
    });
  });

  test('useLocalStorage should return setter', () => {
    renderHook(() => {
      const [value, setValue] = useLocalStorage('mockKey', 1);

      expect(typeof setValue === 'function').toBeTruthy();
    });
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

  test('useActiveSectionObserver', () => {
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
      useActiveSectionObserver('section', 'section-1', []);
    });
    expect(observe).toHaveBeenCalledTimes(0);
  });

  test('useLazyLoadingImages', () => {
    jest.spyOn(document, 'removeEventListener');
    jest.spyOn(document, 'addEventListener');
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
      useLazyLoadingImages(
        'data-src',
        [],
        { year: 2020, month: 'May' }
      );
    });

    expect(observe).toHaveBeenCalledTimes(0);
  });

  test('useParallaxImages', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    jest.spyOn(React, 'useRef').mockImplementation(f => ({ current: false }));
    jest.spyOn(document, 'addEventListener');

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect
    }));
    renderHook(() => {
      useParallaxImages(
        'data-src'
      );
    });

    expect(observe).toHaveBeenCalledTimes(0);
    expect(document.addEventListener).toHaveBeenCalledTimes(0);
  });

  test('useParallaxImages no current', () => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    jest.spyOn(React, 'useRef').mockImplementation(f => ({ current: true }));
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'querySelectorAll');
    // jest.spyOn(window, 'innerHeight');
    // jest.spyOn(window, 'requestAnimationFrane');


    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect
    }));
    renderHook(() => {
      useParallaxImages(
        'data-src'
      );
    });

    expect(observe).toHaveBeenCalledTimes(0);
    expect(document.querySelectorAll).toHaveBeenCalledTimes(1);
    expect(window.innerHeight).toBeTruthy();
    expect(window.requestAnimationFrame).toBeTruthy();
  });

  test('useMarkerAnimation', () => {
    jest.spyOn(global, 'setInterval');
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    renderHook(() => {
      useMarkerAnimation(
        [{ show: true }]
      );
    });
    expect(setInterval).toBeCalledTimes(1);
  });

  test('handleImagesParallax', () => {
    jest.spyOn(window, 'requestAnimationFrame');
    const tickRef = { current: false };
    handleImagesParallax(tickRef);

    expect(window.requestAnimationFrame).toBeCalledTimes(1);
  });

  test('handleImagesParallax 2', () => {
    const div = document.createElement('div');
    div.classList.add('intersecting');
    document.body.appendChild(div);

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(f => f());
    jest.spyOn(document, 'querySelectorAll');
    const tickRef = { current: false };
    handleImagesParallax(tickRef);

    expect(document.querySelectorAll).toBeCalledTimes(1);
  });

  test('markerAnimationCallback', () => {
    const stories = [{ show: true }];
    const setSelectedMarker = jest.fn();
    markerAnimationCallback(stories, setSelectedMarker);
    expect(setSelectedMarker).toBeCalledTimes(1);
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

  test('preloadImage', () => {
    const el = {
      getAttribute: jest.fn().mockReturnValue('test'),
      style: {}
    };

    preloadImage(el);

    expect(el.style.backgroundImage).toEqual('url(test)');
  });

  test('preloadImage no el', () => {
    const el = {
      getAttribute: jest.fn().mockReturnValue(null),
      style: {}
    };

    preloadImage(el);

    expect(el.style.backgroundImage).toEqual(undefined);
  });

  test('lazyLoadingImagesHandleEntries', () => {
    const self = {
      unobserve: jest.fn()
    };
    const entries = [{
      isIntersecting: true,
      target: {
        getAttribute: jest.fn().mockReturnValue('test'),
        style: {}
      }
    }, {
      isIntersecting: true,
      target: {
        getAttribute: jest.fn().mockReturnValue('test'),
        style: {}
      }
    }];

    lazyLoadingImagesHandleEntries(entries, self);

    expect(self.unobserve).toBeCalledTimes(2);
  });

  test('lazyLoadingImagesHandleEntries no intersect', () => {
    const self = {
      unobserve: jest.fn()
    };
    const entries = [{
      isIntersecting: false,
      target: {
        getAttribute: jest.fn().mockReturnValue('test'),
        style: {}
      }
    }, {
      isIntersecting: false,
      target: {
        getAttribute: jest.fn().mockReturnValue('test'),
        style: {}
      }
    }];

    lazyLoadingImagesHandleEntries(entries, self);

    expect(self.unobserve).toBeCalledTimes(0);
  });

  test('parallaxImagesHandleEntries', () => {
    const entries = [{
      isIntersecting: true,
      target: document.createElement('div')
    }, {
      isIntersecting: false,
      target: document.createElement('div')
    }];

    parallaxImagesHandleEntries(entries);


    expect(entries[0].target.classList.contains('intersecting')).toBeTruthy();
    expect(entries[1].target.classList.length).toEqual(0);
  });

  test('parallaxImagesHandleEntries no intersect', () => {
    const entries = [{
      isIntersecting: false,
      target: document.createElement('div')
    }, {
      isIntersecting: false,
      target: document.createElement('div')
    }];

    parallaxImagesHandleEntries(entries);


    expect(entries[0].target.classList.length).toEqual(0);
    expect(entries[1].target.classList.length).toEqual(0);
  });

  test('parallaxImagesHandleEntries no intersect 2', () => {
    const entries = [{
      isIntersecting: false,
      target: document.createElement('div')
    }, {
      isIntersecting: false,
      target: document.createElement('div')
    }];

    entries[0].target.classList.add('intersecting');

    parallaxImagesHandleEntries(entries);


    expect(entries[0].target.classList.length).toEqual(0);
    expect(entries[1].target.classList.length).toEqual(0);
  });

  test('findDate', () => {
    const currentDate = {
      year: 2020,
      monthLong: 'February',
      minus: jest.fn().mockReturnValue({ year: 2020, monthLong: 'January' })
    };
    const storiesLib = { 2020: ['January'] };
    const { foundYear, foundMonth } = findDate(currentDate, storiesLib);
    expect(foundYear).toEqual(2020);
    expect(foundMonth).toEqual(undefined);
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
