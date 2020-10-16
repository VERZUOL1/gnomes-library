import '@testing-library/jest-dom/extend-expect';

require('jest-localstorage-mock');

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line no-undef
jest.mock('console', () => ({
  log: input => input
}));

// eslint-disable-next-line no-undef
jest.mock('lodash', () => ({
  get: (data, path, defaultValue) => {
    if (data && data.path) {
      return data[path];
    }
    return defaultValue;
  }
}));
// eslint-disable-next-line no-undef
jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line no-undef
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: 1
  })
}));
// eslint-disable-next-line no-undef
jest.mock('d3-interpolate', () => ({
  // eslint-disable-next-line
  interpolate: (a, b) => ([0, 1, 2, 3, 4, 5]),
  // eslint-disable-next-line no-unused-vars
  interpolateTransformSvg: (a, b) => ([0, 1, 2, 3, 4, 5])
}));
// eslint-disable-next-line no-undef
jest.mock('connected-react-router', () => ({
  // eslint-disable-next-line no-undef
  goBack: jest.fn(),
  // eslint-disable-next-line
  push: jest.fn()
}));
