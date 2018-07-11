import { enumArrayToObject } from 'utils/mappers';

const WorkTypes = Object.freeze([
  'Feature',
  'Bug',
  'Enhancement',
  'Refactor',
  'Upgrade',
  'Investigate'
]);

export default WorkTypes;

export const WorkType = enumArrayToObject(WorkTypes);
