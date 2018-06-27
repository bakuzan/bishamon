module.exports.mapArrToGraphqlString = function(arr) {
  return arr.join(' ');
};

module.exports.ProjectType = [
  'Application',
  'Training',
  'Library',
  'SubModule'
];

module.exports.WorkType = [
  'Feature',
  'Bug',
  'Enhancement',
  'Refactor',
  'Upgrade',
  'Investigate'
];

module.exports.Status = [
  'Todo',
  'InProgress',
  'OnHold',
  'DevComplete',
  'Testing',
  'Done',
  'Removed'
];
module.exports.DefaultStatus = module.exports.Status[0];
module.exports.FinishedStatus = module.exports.Status[5];
module.exports.RemovedStatus = module.exports.Status[6];
module.exports.NotDoneStatuses = [...module.exports.Status.slice(0, 3)];
module.exports.DoneStatuses = [...module.exports.Status.slice(3, 6)];

module.exports.ItemStatus = [...module.exports.Status.slice(0)].reduce(
  (p, c) => ({ ...p, [c]: c }),
  {}
);
module.exports.IgnoreStatuses = [
  module.exports.ItemStatus.Todo,
  module.exports.ItemStatus.InProgress,
  module.exports.ItemStatus.OnHold
];

module.exports.AuditType = ['WorkItem', 'Task'];
module.exports.AuditWorkItem = module.exports.AuditType[0];
module.exports.AuditTask = module.exports.AuditType[1];
