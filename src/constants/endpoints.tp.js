let currentDomain;

// USE_ENV = MASTER | DEVELOP | CUSTOM
if (process.env.REACT_APP_USE_ENV === 'DEVELOP') {
  currentDomain = `${process.env.REACT_APP_DEV_URL}`;
} else {
  currentDomain = `${process.env.REACT_APP_MASTER_URL}`;
}

const apiPath = url => `${currentDomain}/rrafols/mobile_test/master/${url}`;

export const GET_DATA = apiPath('data.json');
