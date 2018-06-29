const { db: Context, Project, WorkItem, Task } = require('../connectors');
const {
  DefaultStatus,
  ItemStatus,
  IgnoreStatuses
} = require('../constants/enums');
const getWorkItemDerivedStatusCheck = require('../utils/dervied-updates');

module.exports = {
  projectCreate(_, args) {
    return Project.create({ ...args });
  },
  projectUpdate(_, { id, ...args }) {
    return Project.update(
      { ...args },
      { where: { id }, individualHooks: true }
    ).then((count) => Project.findById(id));
  },
  workItemCreate(_, { projectId, ...args }) {
    return WorkItem.create({ ...args, status: DefaultStatus }).then(
      (workItem) =>
        Project.findById(projectId)
          .then((project) => project.addWorkItem(workItem))
          .then(() => workItem)
    );
  },
  workItemUpdate(_, { id, ...args }) {
    return WorkItem.update(
      { ...args },
      { where: { id }, individualHooks: true }
    ).then((count) => WorkItem.findById(id));
  },
  taskCreate(_, { workItemId, ...args }) {
    let createdTask;
    return Task.create({ ...args, status: DefaultStatus })
      .then((task) => {
        createdTask = task;
        return WorkItem.findById(workItemId);
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
      .then(() => Task.findById(id))
      .then((task) => {
        updatedTask = task.dataValues;
        const { workItemId } = updatedTask;
        return WorkItem.findById(workItemId);
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
