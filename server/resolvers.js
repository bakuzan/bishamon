const Op = require('sequelize').Op;

const { Project, WorkItem, Task } = require('./connectors');
const Constants = require('./constants/index');
const { DoneStatuses, DefaultStatus } = require('./constants/enums');

module.exports = {
  Query: {
    projects(_, args) {
      return Project.findAll({ where: args });
    },
    project(_, args) {
      const { id } = args;
      return Project.findById(id);
    },
    workItems(_, args) {
      return WorkItem.findAll({ where: args });
    },
    workItem(_, args) {
      const { id } = args;
      return WorkItem.findById(id);
    },
    tasks(_, args) {
      return Task.findAll({ where: args });
    }
  },
  Mutation: {
    projectCreate(_, args) {
      return Project.create({ ...args });
    },
    workItemCreate(_, args) {
      return WorkItem.create({ ...args, status: DefaultStatus });
    },
    workItemUpdate(_, { id, ...args }) {
      return WorkItem.update({ ...args }, { where: { id } }).then(count =>
        WorkItem.findById(id)
      );
    },
    taskCreate(_, args) {
      return Task.create({ ...args, status: DefaultStatus });
    },
    taskUpdate(_, { id, ...args }) {
      return Task.update({ ...args }, { where: { id } }).then(count =>
        Task.findById(id)
      );
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
      return Task.findAll({ where: { workItemId: workItem.id } }).then(
        tasks => {
          const total = tasks.length;
          const done = tasks.filter(t => DoneStatuses.includes(t.status))
            .length;
          if (!total) return 'N/A';
          return `${done}/${total}`;
        }
      );
    },
    tasks(workItem) {
      return workItem.getTasks();
    }
  }
};
