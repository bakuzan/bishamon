const Status = [
  'Todo',
  'InProgress',
  'OnHold',
  'DevComplete',
  'Testing',
  'Done',
  'Removed'
];

export default Status;

export const SwimlaneStatus = [...Status.slice(0, -1)];
