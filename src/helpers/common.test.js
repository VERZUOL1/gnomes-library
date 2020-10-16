import { bool, interpolation, randomInteger } from './common';

describe('Common helpers', () => {
  test('bool function should return parsed true boolean value', () => {
    expect(bool('true')).toBeTruthy();
    expect(bool(true)).toBeTruthy();
    expect(bool(1)).toBeTruthy();
    expect(bool(2)).toBeTruthy();
    expect(bool({})).toBeTruthy();
  });

  test('bool function should return parsed false boolean value', () => {
    expect(bool('false')).toBeFalsy();
    expect(bool(false)).toBeFalsy();
    expect(bool(0)).toBeFalsy();
    expect(bool(null)).toBeFalsy();
    expect(bool(undefined)).toBeFalsy();
  });

  test('interpolation should return interpolated value', () => {
    expect(interpolation(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test('interpolation should return interpolated value for svg', () => {
    expect(interpolation(0, 5, 'transform')).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test('randomInteger should return value from provided range', () => {
    const value = randomInteger(0, 5);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(5);
  });

  test('randomInteger should return null if no range provided', () => {
    const value = randomInteger();

    expect(value).toBeNull();
  });
});
