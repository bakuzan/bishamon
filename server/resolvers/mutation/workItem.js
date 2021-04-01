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
  async workItemUpdate(_, { id, ...args }) {
    const originalItem = await WorkItem.findByPk(id, { raw: true });
    const cause = Utils.resolveWorkItemCause(args);
    let projectId = originalItem.projectId;

    if (args.projectId && projectId !== args.projectId) {
      const project = await Project.findByPk(args.projectId, { raw: true });

      if (project === null) {
        throw new Error(`Project(Id: ${args.projectId}) not found.`);
      }

      projectId = args.projectId;
    }

    return await WorkItem.update(
      { ...args, cause, projectId },
      { where: { id }, individualHooks: true }
    ).then((count) => WorkItem.findByPk(id));
  }
};
