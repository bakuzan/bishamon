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
export const OnHold = Status.slice(2, 3)[0];
export const InProgress = Status.slice(1, 2)[0];
