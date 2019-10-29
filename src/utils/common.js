import Store from 'ayaka/localStorage';
import LoadingBouncer from 'meiko/LoadingBouncer';
import Strings from 'constants/strings';

export const appSettingsStore = new Store(Strings.appSettingsStorage, {});

export const dataIdForObject = (o) => `${o.__typename}:${o.id}`;

export const createMapFromArray = (arr, prop = 'id') => {
  return arr.reduce((p, c) => {
    const list = p.has(c.status) ? p.get(c.status) : [];
    return p.set(c.status, [...list, c]);
  }, new Map([]));
};

export const loadableSettings = {
  loading: LoadingBouncer,
  delay: 500
};
