const {
  DefaultStatus,
  NotDoneStatuses,
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

const updateWorkItemPostTaskChange = (db, workItemId) => taskCheck => {
  db.models.workItem.findById(workItemId).then(workItem =>
    workItem.getTasks().then(tasks => {
      const workItemData = workItem.dataValues;
      const newStatus = taskCheck(tasks, workItemData);
      if (newStatus && workItemData.status !== newStatus) {
        updateWorkItemStatus(db, workItemData, newStatus);
      }
    })
  );
};

module.exports = (db, instance, options) => {
  const { dataValues, _previousDataValues, _changed } = instance;

  if (!_changed.status) return instance;
  const checkWorkItemTasks = updateWorkItemPostTaskChange(
    db,
    dataValues.workItemId
  );

  if (dataValues.status === ItemStatus.InProgress) {
    checkWorkItemTasks(
      (tasks, workItem) =>
        workItem.status !== ItemStatus.InProgress
          ? ItemStatus.InProgress
          : undefined
    );
  } else if (DoneStatuses.includes(dataValues.status)) {
    checkWorkItemTasks(tasks => {
      const taskStatuses = tasks
        .map(x => x.dataValues)
        .reduce(
          (p, c) =>
            p.has(c.status)
              ? p.set(c.status, [...p.get(c.status), c])
              : p.set(c.status, [c]),
          new Map([])
        );

      if (Utils.checkMapForKeys(taskStatuses, NotDoneStatuses))
        return undefined;

      return Utils.firstAvailableKey(taskStatuses, DoneStatuses);
    });
  }

  return instance;
};
