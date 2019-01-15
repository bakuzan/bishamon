const { Project, WorkItem } = require('../../connectors');
const { DefaultStatus } = require('../../constants/enums');

const Utils = require('../../utils');

module.exports = {
  workItemCreate(_, { projectId, ...args }) {
    const cause = Utils.resolveWorkItemCause(args);
    return WorkItem.create({ ...args, status: DefaultStatus, cause }).then(
      (workItem) =>
        Project.findByPk(projectId)
          .then((project) => project.addWorkItem(workItem))
          .then(() => workItem)
    );
  },
  workItemUpdate(_, { id, ...args }) {
    const cause = Utils.resolveWorkItemCause(args);

    return WorkItem.update(
      { ...args, cause },
      { where: { id }, individualHooks: true }
    ).then((count) => WorkItem.findByPk(id));
  }
};
