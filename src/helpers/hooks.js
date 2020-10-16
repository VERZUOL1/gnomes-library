import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';

import { getData } from '../actions/data';

// Helpers
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';
import { getGridProps, randomInteger } from './common';

// Data loader
export function useDataLoader() {
  const dispatch = useDispatch();
  // const filter = useSelector(getFilterFromStore);

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

/** Local storage hook */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(getLocalStorageItem(key, initialValue));

  /**
   * Return a wrapped version of useState's setter
   * function that persists the new value to localStorage.
   */
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      setLocalStorageItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue];
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

export function preloadImage(el) {
  const src = el.getAttribute('data-src');
  if (!src) { return; }
  // eslint-disable-next-line no-param-reassign
  el.style.backgroundImage = `url(${src})`;
}

export function lazyLoadingImagesHandleEntries(entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target);
      self.unobserve(entry.target);
    }
  });
}

/* Custom lazy loaded images hook */
export const useLazyLoadingImages = (dataAttribute, moments, selectedMonth, orientation) => {
  useEffect(() => {
    const images = Array.from(document.querySelectorAll(`[${dataAttribute}]`));
    const config = { threshold: 0, rootMargin: '0px 0px 200px 0px' };
    const observer = new IntersectionObserver((entries, self) => {
      lazyLoadingImagesHandleEntries(entries, self);
    }, config);
    images.forEach(image => { observer.observe(image); });

    return () => observer.disconnect();
  }, [dataAttribute, moments, selectedMonth, orientation]);
};

export function parallaxImagesHandleEntries(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('intersecting');
    } else if (!entry.isIntersecting && entry.target.classList.contains('intersecting')) {
      entry.target.classList.remove('intersecting');
    }
  });
}

export function handleImagesParallax(tickRef) {
  const windowHeight = window.innerHeight;
  window.requestAnimationFrame(() => {
    const intersectingImages = Array.from(document.querySelectorAll('.intersecting'));
    intersectingImages.forEach(image => {
      const { y } = image.getBoundingClientRect();
      const shift = windowHeight - y;
      const shiftPerc = (shift * 100) / windowHeight;
      // eslint-disable-next-line no-param-reassign
      image.style.transform = `scale(1.2) translate(${shiftPerc / 50}%, ${shiftPerc / 10}%)`;
    });
    // eslint-disable-next-line no-param-reassign
    tickRef.current = false;
  });
}

export const useParallaxImages = dataAttribute => {
  const tickRef = React.useRef(false);
  const handler = useCallback(() => {
    if (!tickRef.current) {
      handleImagesParallax(tickRef);
      tickRef.current = true;
    }
  }, []);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll(`[${dataAttribute}]`));
    const config = { threshold: 0, rootMargin: '0px 0px 0px 0px' };
    const root = document.getElementById('root');
    root.addEventListener('scroll', handler, { passive: true });

    const observer = new IntersectionObserver(entries => {
      parallaxImagesHandleEntries(entries);
    }, config);
    images.forEach(image => { observer.observe(image); });

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', handler, { passive: true });
    };
  }, [dataAttribute, handler]);
};

export const useActiveSectionObserver = (sectionSelector, defaultActiveSection, momentsData) => {
  const [activeSectionId, setActiveSectionId] = useState();

  const handleIntersect = useCallback(entry => {
    const { id } = entry.target;
    setActiveSectionId(id);
  }, [setActiveSectionId]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(sectionSelector));
    const config = {
      rootMargin: '-50px 0px -55%',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleIntersect(entry);
        }
      });
    }, config);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [handleIntersect, sectionSelector]);

  const momentsArray = Array.from(momentsData);
  const selectedIndex = momentsArray.findIndex(([key]) => key === activeSectionId);
  const nextMoment = momentsArray[selectedIndex + 1];
  const prevMoment = momentsArray[selectedIndex - 1];

  return [nextMoment, prevMoment, activeSectionId];
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

export function markerAnimationCallback(stories, setSelectedMarker) {
  const visibleStories = stories.filter(item => item.show);
  const selectedMarkerInd = randomInteger(0, visibleStories.length - 1);
  setSelectedMarker(visibleStories[selectedMarkerInd]?.id);
}

export function useMarkerAnimation(stories) {
  const intervalRef = useRef();
  const [selectedMarker, setSelectedMarker] = useState(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      markerAnimationCallback(stories, setSelectedMarker);
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [stories]);

  return selectedMarker;
}

export function useBatAnimation(min, max) {
  const pathRef = useRef();
  const intervalRef = useRef();
  const [show, setShow] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    setPathLength((pathRef?.current?.getTotalLength && pathRef?.current?.getTotalLength()) || 0);
    const newTimeout = randomInteger(min, max);

    intervalRef.current = setTimeout(() => {
      setShow(true);
    }, newTimeout);

    return () => {
      clearTimeout(intervalRef.current);
    };
  }, [min, max]);

  const restartAnimation = useCallback(() => {
    setShow(false);
    clearTimeout(intervalRef.current);
    const newTimeout = randomInteger(min, max);

    intervalRef.current = setTimeout(() => {
      setShow(true);
    }, newTimeout);
  }, [setShow, min, max]);

  const direction = randomInteger(0, 1) === 0 ? 'forward' : 'backward';

  return { pathRef, restartAnimation, show, pathLength, direction };
}

export function findDate(currentDate, storiesLib) {
  let foundYear;
  let foundMonth;
  let prevDate = currentDate;
  do {
    if (storiesLib[prevDate.year]) {
      foundYear = prevDate.year;
      // eslint-disable-next-line no-loop-func
      const month = storiesLib[prevDate.year].find(item => item === prevDate.monthLong);
      if (month) {
        foundMonth = month;
        break;
      }
    }
    prevDate = prevDate.minus({ month: 1 });
  } while (!foundMonth && !(prevDate.year === 2020 && prevDate.monthLong === 'January'));

  return { foundMonth, foundYear };
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
