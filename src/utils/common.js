import {Utils} from 'meiko';

export const {
  generateUniqueId,
  capitalise
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