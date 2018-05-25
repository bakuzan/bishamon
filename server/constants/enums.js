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
