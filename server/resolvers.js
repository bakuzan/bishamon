const { Project, WorkItem } = require('./connectors');
const Constants = require('./constants/index');
const { DefaultStatus } = require('./constants/enums');

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
    }
  },
  Mutation: {
    projectCreate(_, args) {
      return Project.create({ ...args });
    },
    workItemCreate(_, args) {
      return WorkItem.create({ ...args, status: DefaultStatus });
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
    workItems(project) {
      return project.getWorkItems();
    }
  },
  WorkItem: {
    taskRatio(workItem) {}
  }
};
