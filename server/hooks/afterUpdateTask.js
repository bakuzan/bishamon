const {
  DefaultStatus,
  NotDoneStatus,
  DoneStatuses,
  ItemStatus
} = require('../constants/enums');
const Utils = require('../utils');

function updateWorkItemStatus(db, workItem, status) {
  db.models.workItem.update(
    { status },
    { where: { id: workItem.id }, individualHooks: true }
  );
}

const updateWorkItemPostTaskChange = (db, workItemId) => (where, taskCheck) => {
  db.models.workItem.findById(workItemId).then(workItem =>
    workItem.getTasks({ where }).then(tasks => {
      const newStatus = taskCheck(tasks);
      if (newStatus && workItem.status !== newStatus) {
        updateWorkItemStatus(db, workItem, newStatus);
      }
    })
  );
};

module.exports = (db, instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;
  console.log('task update', _changed);
  if (!_changed.status) return instance;
  const checkWorkItemTasks = updateWorkItemPostTaskChange(
    db,
    dataValues.workItemId
  );

  if (
    dataValues.status === ItemStatus.InProgress &&
    _previousDataValues.status === ItemStatus.Todo
  ) {
    checkWorkItemTasks(
      { status: DefaultStatus },
      tasks => (tasks.length === 0 ? ItemStatus.InProgress : undefined)
    );
  } else if (DoneStatuses.includes(dataValues.status)) {
    checkWorkItemTasks({}, tasks => {
      const taskStatuses = tasks.reduce((p, c) => {
        const data = p.has(c.status) ? p.get(c.status) : [];
        return p.set(c.status, [...data, c]);
      }, new Map([]));
      if (Utils.checkMapForKeys(taskStatuses, NotDoneStatus)) return undefined;
      return Utils.firstAvailableKey(taskStatuses, DoneStatuses);
    });
  }

  return instance;
};
