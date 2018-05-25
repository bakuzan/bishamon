const { Project } = require('./connectors');
const Constants = require('./constants/index');

module.exports = {
  Query: {
    projects(_, args) {
      return Project.findAll({ where: args });
    },
    project(_, args) {
      const { id } = args;
      return Project.findById(id);
    }
  },
  Mutation: {
    projectCreate(_, args) {
      return Project.create({ ...args });
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
  }
};
