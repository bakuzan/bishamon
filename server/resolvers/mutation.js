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
    ).then(count => Project.findById(id));
  },
  workItemCreate(_, { projectId, ...args }) {
    return WorkItem.create({ ...args, status: DefaultStatus }).then(workItem =>
      Project.findById(projectId)
        .then(project => project.addWorkItem(workItem))
        .then(() => workItem)
    );
  },
  workItemUpdate(_, { id, ...args }) {
    return WorkItem.update(
      { ...args },
      { where: { id }, individualHooks: true }
    ).then(count => WorkItem.findById(id));
  },
  taskCreate(_, { workItemId, ...args }) {
    return Context.transaction(transaction => {
      return Task.create(
        { ...args, status: DefaultStatus },
        { transaction }
      ).then(task => {
        return WorkItem.findById(workItemId, { transaction })
          .then(workItem => {
            workItem.addTask(task, { transaction });
            if (IgnoreStatuses.includes(workItem.status)) return;

            return WorkItem.update(
              { status: ItemStatus.InProgress },
              {
                where: { id: workItemId },
                individualHooks: true,
                transaction
              }
            );
          })
          .then(() => task);
      });
    });
  },
  taskUpdate(_, { id, ...args }) {
    return Context.transaction(transaction => {
      return Task.update(
        { ...args },
        {
          where: { id },
          individualHooks: true,
          transaction
        }
      ).then(() => {
        return workItem.findById(workItemId, { transaction }).then(workItem => {
          return workItem
            .getTasks({}, { transaction })
            .then(tasks => {
              const workItemData = workItem.dataValues;
              const taskStatusCheck = getWorkItemDerivedStatusCheck(
                args.status
              );
              const newStatus = taskStatusCheck(tasks, workItemData);

              if (newStatus && workItemData.status !== newStatus) {
                workItem.update(
                  { status },
                  {
                    where: { id: workItem.id },
                    individualHooks: true,
                    transaction
                  }
                );
              }

              return tasks.find(x => x.id === id);
            })
            .then(task => task);
        });
      });
    });
  }
};
