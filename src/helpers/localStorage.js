const storageExist = name => localStorage.getItem(name);

const createStorage = (name, value) => localStorage.setItem(name, value);

const removeStorage = name => localStorage.removeItem(name);

/** Get LS item */
export const getLocalStorageItem = (key, initialValue) => {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (e) {
    // If error also return initialValue
    // eslint-disable-next-line no-console
    console.log(e);
    return initialValue;
  }
};

/** Set LS item */
export const setLocalStorageItem = (key, value) => {
  try {
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // A more advanced implementation would handle the error case
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

/**
 * Deserialize stored data from local storage
 * @returns {*}
 */
export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);

    return undefined;
  }
};

/**
 * Serialize state to localstorage
 * @param key
 * @param state
 */
export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

/**
 * Remove value in localstorage
 * @param key
 */
export const resetState = key => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

export const storageActions = {
  storageExist,
  createStorage,
  removeStorage
};
