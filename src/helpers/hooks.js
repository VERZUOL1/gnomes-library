import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';

import { getData } from '../actions/data';

// Helpers
import { getGridProps } from './common';

// Data loader
export function useDataLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
}

export function useScrollTop(dep, selector = '.scrollable-content__wrapper', smoothBehavior) {
  useLayoutEffect(() => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: smoothBehavior ? 'smooth' : 'auto' });
    }
  }, [dep, selector, smoothBehavior]);
}

export function useOnClickOutside(ref, handler, allowedRef) {
  React.useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        if (allowedRef) {
          if (!allowedRef.current || allowedRef.current.contains(event.target)) {
            return;
          }
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler, allowedRef]
  );
}

/**
 * Custom useIntersect hook
 * @param root
 * @param rootMargin
 * @param threshold
 */
export const useIntersect = ({ root = null, rootMargin, threshold }) => {
  const [observerEntry, setEntry] = useState({});
  const elRef = React.useRef();

  useEffect(
    () => {
      const observer = new IntersectionObserver(
        entries => setEntry(entries[0]),
        {
          root,
          rootMargin,
          threshold: threshold?.indexOf(',') > -1 ? threshold.split(',').map(el => +el) : threshold
        }
      );
      if (elRef.current) {
        observer.observe(elRef.current);
      }
      return () => observer.disconnect();
    },
    [elRef, root, rootMargin, threshold]
  );
  return [observerEntry, elRef];
};

export function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

export function useForceUpdate(dep) {
  const orientation = React.useRef(dep);
  const [, setTick] = React.useState(0);
  const update = React.useCallback(() => {
    setTick(tick => tick + 1);
  }, []);

  useEffect(() => {
    if (orientation.current !== dep) {
      orientation.current = dep;
      update();
    }
  }, [dep, update]);

  return update;
}

export function useResizableGrid(dataLength) {
  const [gridProps, setGridProps] = useState(getGridProps(dataLength));

  React.useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      setGridProps(getGridProps(dataLength));
    });

    ro.observe(document.body);

    return () => {
      ro.disconnect();
    };
  }, [dataLength]);

  return gridProps;
}
