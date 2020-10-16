import { interpolate, interpolateTransformSvg } from 'd3-interpolate';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

export function bool(v) {
  return v === 'false' || v === 'null' || v === 'NaN' || v === 'undefined' || v === '0'
    ? false : !!v;
}

export const interpolation = (begValue, endValue, attr) => {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue);
  }

  return interpolate(begValue, endValue);
};

export function randomInteger(min, max) {
  if (min === undefined || max === undefined) {
    return null;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
