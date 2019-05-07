const { WorkItem, Task } = require('../../connectors');
const {
  DefaultStatus,
  ItemStatus,
  IgnoreStatuses
} = require('../../constants/enums');
const getWorkItemDerivedStatusCheck = require('../../utils/derviedUpdates');

module.exports = {
  taskCreate(_, { workItemId, ...args }) {
    let createdTask;
    return Task.create({ ...args, status: DefaultStatus })
      .then((task) => {
        createdTask = task;
        return WorkItem.findByPk(workItemId);
      })
      .then((workItem) => {
        workItem.addTask(createdTask);
        return workItem;
      })
      .then((workItem) => {
        if (IgnoreStatuses.includes(workItem.status)) return;

        return WorkItem.update(
          { status: ItemStatus.InProgress },
          {
            where: { id: workItemId },
            individualHooks: true
          }
        );
      })
      .then(() => createdTask)
      .catch((error) => error);
  },
  taskUpdate(_, { id, ...args }) {
    let updatedTask;
    return Task.update(
      { ...args },
      {
        where: { id },
        individualHooks: true
      }
    )
      .then(() => Task.findByPk(id))
      .then((task) => {
        updatedTask = task.dataValues;
        const { workItemId } = updatedTask;
        return WorkItem.findByPk(workItemId);
      })
      .then(async (workItem) => ({
        tasks: await workItem.getTasks(),
        workItem
      }))
      .then((data) => {
        const { workItem, tasks } = data;
        const workItemData = workItem.dataValues;
        const taskStatusCheck = getWorkItemDerivedStatusCheck(args.status);
        const newStatus = taskStatusCheck(tasks, workItemData);

        if (newStatus && workItemData.status !== newStatus) {
          return workItem.update(
            { status: newStatus },
            {
              where: { id: workItem.id },
              individualHooks: true
            }
          );
        }

        return;
      })
      .then(() => updatedTask)
      .catch((error) => error);
  }
};
