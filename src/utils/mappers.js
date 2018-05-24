import {generateUniqueId, capitalise} from './common';

export const projectColourModel = (code) => ({
  id: generateUniqueId(),
  code
});

export const enumsToSelectBoxOptions = obj =>
  Object.keys(obj).map(k => ({ value: obj[k], text: capitalise(k) }));
