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

export const SwimlaneStatus = [...Status.slice(0, 2), ...Status.slice(3, -1)];
