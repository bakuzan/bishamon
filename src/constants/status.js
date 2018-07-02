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

export const DoneStatuses = [...Status.slice(3, 6)];
export const SwimlaneStatus = [...Status.slice(0, 2), ...Status.slice(3, -1)];
export const OnHold = Status.slice(2, 3)[0];
export const InProgress = Status.slice(1, 2)[0];
export const Removed = Status.slice(-1)[0];

export const ItemStatus = Status.reduce((p, c) => ({ ...p, [c]: c }), {});
