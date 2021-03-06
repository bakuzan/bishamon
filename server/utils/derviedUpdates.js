const {
  NotDoneStatuses,
  DoneStatuses,
  ItemStatus
} = require('../constants/enums');
const Utils = require('.');

module.exports = (taskStatus) => {
  let taskStatusCheck = () => undefined;

  if (taskStatus === ItemStatus.InProgress) {
    taskStatusCheck = (tasks, workItem) =>
      workItem.status !== ItemStatus.InProgress
        ? ItemStatus.InProgress
        : undefined;
  } else if (
    DoneStatuses.includes(taskStatus) ||
    taskStatus === ItemStatus.Removed
  ) {
    taskStatusCheck = (tasks) => {
      const taskStatuses = tasks
        .map((x) => x.dataValues)
        .reduce(
          (p, c) =>
            p.has(c.status)
              ? p.set(c.status, [...p.get(c.status), c])
              : p.set(c.status, [c]),
          new Map([])
        );

      if (Utils.checkMapForKeys(taskStatuses, NotDoneStatuses)) {
        return undefined;
      }

      return Utils.firstAvailableKey(taskStatuses, DoneStatuses);
    };
  }
  return taskStatusCheck;
};
