import {generateUniqueId, capitaliseEachWord, fromCamelCase} from './common';

export const projectColourModel = (code) => ({
  id: generateUniqueId(),
  code
});

export const enumsToSelectBoxOptions = arr =>
  arr.map(value => ({ value, text: capitaliseEachWord(fromCamelCase(value)) }));
