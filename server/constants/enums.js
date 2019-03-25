const enumArrayToObject = (arr) =>
  arr.slice(0).reduce((p, c) => ({ ...p, [c]: c }), {});

const mapArrToGraphqlString = (arr) => arr.join(' ');

const ProjectType = [
  'Application',
  'Training',
  'Library',
  'SubModule',
  'Utility'
];

const WorkType = [
  'Feature',
  'Bug',
  'Enhancement',
  'Refactor',
  'Upgrade',
  'Investigate'
];
const WorkTypes = enumArrayToObject(WorkType);

const Status = [
  'Todo',
  'InProgress',
  'OnHold',
  'DevComplete',
  'Testing',
  'Done',
  'Removed'
];
const ItemStatus = enumArrayToObject(Status);
const DefaultStatus = ItemStatus.Todo;
const NotDoneStatuses = [...Status.slice(0, 3)];
const DoneStatuses = [...Status.slice(3, 6)];

const IgnoreStatuses = [
  ItemStatus.Todo,
  ItemStatus.InProgress,
  ItemStatus.OnHold
];

const AuditType = ['WorkItem', 'Task'];
const AuditTypes = enumArrayToObject(AuditType);

module.exports = {
  mapArrToGraphqlString,
  ProjectType,
  WorkType,
  WorkTypes,
  Status,
  ItemStatus,
  DefaultStatus,
  NotDoneStatuses,
  DoneStatuses,
  IgnoreStatuses,
  AuditType,
  AuditTypes
};
