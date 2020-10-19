import { interpolate, interpolateTransformSvg } from 'd3-interpolate';
import {
  isTabletDevice,
  isMobileDevice
} from 'responsive-react/dist/utilResponsive';

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

export function getGridProps(dataLength) {
  // columnCount
  // rowCount
  // rowHeight
  let columnCount;
  if (isMobileDevice()) {
    columnCount = 1;
  } else if (isTabletDevice()) {
    columnCount = 2;
  } else {
    columnCount = 3;
  }

  return {
    columnCount,
    rowCount: dataLength / columnCount,
    rowHeight: 450
  };
}

export function getCharacterData(data, columnIndex, rowIndex, columnCount) {
  const lastItemInRowIndex = columnCount * (rowIndex + 1);
  const itemIndex = lastItemInRowIndex - columnIndex;

  return data[itemIndex];
}

const FEMALE_NAMES_SUFFIX = ['te', 'ia', 'le', 'li'];
export function getGender(character) {
  const name = character.name.substring(0, character.name.indexOf(' ')).trim();
  if (name) {
    const suffix = name.substring(name.length - 2);
    if (suffix && FEMALE_NAMES_SUFFIX.includes(suffix)) {
      return 'female';
    }
  }
  return 'male';
}
