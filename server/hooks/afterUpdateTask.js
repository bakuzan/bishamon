const { WorkItem } = require('../connectors');
const { DoneStatuses, ItemStatus } = require('../constants/enums');

module.exports = (instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;
  console.log('task update', _changed);
  if (!_changed.status) return instance;
  console.log('status change >', instance);
  if (
    dataValues.status === ItemStatus.InProgress &&
    _previousDataValues.status === ItemStatus.Todo
  ) {
    console.log('set work item to InProgress if is Todo');
  } else if (DoneStatuses.includes(dataValues.status)) {
    console.log(
      'set work item to the least far along task of the done statuses'
    );
    // i.e. If the least complete task is at Testing, then set Testing.
    //      If is at DevComplete, then DevComplete etc.
  }

  return instance;
};
