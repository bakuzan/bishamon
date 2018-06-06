const Op = require('sequelize').Op;

const { Project, WorkItem, Task } = require('./connectors');
const { Audit } = require('./connectors/audit');
const Constants = require('./constants/index');
const { DoneStatuses, DefaultStatus } = require('./constants/enums');
const Utils = require('./utils');

module.exports = {
  Query: {
    projects(_, args) {
      return Project.findAll({ where: args });
    },
    project(_, args) {
      const { id } = args;
      return Project.findById(id);
    },
    workItems(_, { statusIn, ...args }) {
      const optionalArgs = !statusIn ? {} : { status: { [Op.or]: statusIn } };

      return WorkItem.findAll({
        where: {
          ...args,
          ...optionalArgs
        }
      });
    },
    workItem(_, args) {
      const { id } = args;
      return WorkItem.findById(id);
    },
    tasks(_, args) {
      return Task.findAll({ where: args });
    },
    task(_, args) {
      const { id } = args;
      return Task.findById(id);
    },
    audits(_, args) {
      return Audit.findAll({ where: args });
    }
  },
  Mutation: {
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
      return WorkItem.create({ ...args, status: DefaultStatus }).then(
        workItem =>
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
      return Task.create({ ...args, status: DefaultStatus }).then(task =>
        WorkItem.findById(workItemId)
          .then(workItem => workItem.addTask(task))
          .then(() => task)
      );
    },
    taskUpdate(_, { id, ...args }) {
      return Task.update(
        { ...args },
        { where: { id }, individualHooks: true }
      ).then(count => Task.findById(id));
    }
  },
  Project: {
    colours(project, args) {
      const { colours } = project.dataValues;
      const limit = args.limit || undefined;
      return colours.split(',').slice(0, limit);
    },
    primaryColour(project) {
      const { colours } = project.dataValues;
      return colours.split(',')[0] || Constants.fallbackColour;
    },
    workItems(project, args) {
      return project.getWorkItems();
    },
    workItem(project, args) {
      return project
        .getWorkItems({ where: { id: args.workItemId } })
        .then(items => items[0]);
    }
  },
  WorkItem: {
    taskRatio(workItem) {
      return workItem.getTasks().then(tasks => {
        const total = tasks.length;
        const done = tasks.filter(t => DoneStatuses.includes(t.status)).length;
        if (!total) return 'N/A';
        return `${done}/${total}`;
      });
    },
    tasks(workItem) {
      return workItem.getTasks();
    }
  },
  Audit: {
    updatedAt(audit) {
      return Utils.formatDateISO(audit.updatedAt);
    }
  }
};
