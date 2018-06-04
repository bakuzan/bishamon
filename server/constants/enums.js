module.exports.mapArrToGraphqlString = function(arr) {
  return arr.join(' ');
};

module.exports.ProjectType = ['Application', 'Training'];

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
module.exports.NotDoneStatuses = [...module.exports.Status.slice(0, 3)];
module.exports.DoneStatuses = [...module.exports.Status.slice(3, 6)];

module.exports.ItemStatus = module.exports.Status.reduce(
  (p, c) => ({ ...p, c }),
  {}
);

module.exports.AuditType = ['WorkItem', 'Task'];
module.exports.AuditWorkItem = module.exports.AuditType[0];
module.exports.AuditTask = module.exports.AuditType[1];
