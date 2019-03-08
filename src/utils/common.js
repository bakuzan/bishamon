import generateUniqueId from 'ayaka/generateUniqueId';
import {
  capitalise,
  capitaliseEachWord,
  separateAndCapitalise,
  separateAndCapitaliseAll
} from 'ayaka/capitalise';
import fromCamelCase from 'ayaka/fromCamelCase';
import objectsAreEqual from 'ayaka/objectsAreEqual';
import debounce from 'ayaka/debounce';
import getEventValue from 'ayaka/getEventValue';
import Store from 'ayaka/localStorage';

import { Loaders } from 'meiko-lib';
import Strings from 'constants/strings';

export {
  generateUniqueId,
  capitalise,
  capitaliseEachWord,
  separateAndCapitalise,
  separateAndCapitaliseAll,
  debounce,
  objectsAreEqual,
  fromCamelCase,
  getEventValue
};

export const appSettingsStore = new Store(Strings.appSettingsStorage, {});

export const dataIdForObject = (o) => `${o.__typename}:${o.id}`;

export const createMapFromArray = (arr, prop = 'id') => {
  return arr.reduce((p, c) => {
    const list = p.has(c.status) ? p.get(c.status) : [];
    return p.set(c.status, [...list, c]);
  }, new Map([]));
};

export const loadableSettings = {
  loading: Loaders.LoadingBouncer,
  delay: 500
};
