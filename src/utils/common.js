import {
  getObjectFromLocalStorageByProperty,
  persistObjectToLocalStorage
} from 'meiko-lib';
import Strings from 'constants/strings';

export const dataIdForObject = (o) => `${o.__typename}:${o.id}`;

export const getAppSettings = () =>
  getObjectFromLocalStorageByProperty(Strings.appSettingsStorage);

export const saveAppSettings = persistObjectToLocalStorage(
  Strings.appSettingsStorage
);

export const createMapFromArray = (arr, prop = 'id') => {
  return arr.reduce((p, c) => {
    const list = p.has(c.status) ? p.get(c.status) : [];
    return p.set(c.status, [...list, c]);
  }, new Map([]));
};
