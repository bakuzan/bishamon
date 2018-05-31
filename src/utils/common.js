import { Utils } from 'meiko';
import Strings from 'constants/strings';

export const {
  generateUniqueId,
  capitalise,
  objectsAreEqual,
  debounce
} = Utils.Common;

export const capitaliseEachWord = str =>
  str
    .split(' ')
    .map(capitalise)
    .join(' ');

export const fromCamelCase = (str, separator = ' ') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

export const dataIdForObject = o => `${o.__typename}_${o.id}`;

export const getAppSettings = () =>
  Utils.Common.getObjectFromLocalStorageByProperty(Strings.appSettingsStorage);

export const saveAppSettings = Utils.Common.persistObjectToLocalStorage(
  Strings.appSettingsStorage
);
