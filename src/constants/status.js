import { enumArrayToObject } from 'utils/mappers';

const Status = Object.freeze([
  'Todo',
  'InProgress',
  'OnHold',
  'DevComplete',
  'Testing',
  'Done',
  'Removed'
]);

export default Status;

export const ItemStatus = enumArrayToObject(Status);

export const DoneStatuses = [...Status.slice(3, 6)];
export const SwimlaneStatus = [...Status.slice(0, 2), ...Status.slice(3, -1)];
