const { db: Context, Project, WorkItem, Task } = require('../connectors');
const { DefaultStatus } = require('../constants/enums');

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
      return Task.create({ ...args, status: DefaultStatus, transaction }).then(
        task =>
          WorkItem.findById(workItemId)
            .then(workItem => workItem.addTask(task))
            .then(() => task)
      );
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
      ).then(count => Task.findById(id));
    });
  }
};
