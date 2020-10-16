import { storageActions, loadState, saveState, resetState } from './localStorage';

describe('storageActions tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get item from storage', () => {
    localStorage.setItem('storageItemName', 'storageSavedData');

    const expectedData = 'storageSavedData';
    const name = 'storageItemName';

    const data = storageActions.storageExist(name);

    expect(data).toEqual(expectedData);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(name);
    expect(localStorage.__STORE__[name]).toBe(expectedData);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should save item to storage', () => {
    const value = 'storageSavedData';
    const name = 'storageItemName';
    storageActions.createStorage(name, value);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(name, value);
    expect(localStorage.__STORE__[name]).toBe(value);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should remove item from storage', () => {
    localStorage.setItem('storageItemName', 'storageSavedData');

    const name = 'storageItemName';

    storageActions.removeStorage(name);

    expect(localStorage.removeItem).toHaveBeenLastCalledWith(name);
    expect(localStorage.__STORE__[name]).toBe(undefined);
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });

  it('should load state', () => {
    const state = loadState('test');

    expect(state).toEqual(undefined);
  });
  it('should save state', () => {
    saveState('test', { data: 'test' });
    const state = loadState('test');

    expect(state).toEqual({ data: 'test' });
  });
  it('should reset state', () => {
    saveState('test', { data: 'test' });
    resetState('test');
    const state = loadState('test');
    expect(state).toEqual(undefined);
  });
});
