const { Project } = require('./connectors');

module.exports = {
  Query: {
    projects(_, args) {
      return Project.findAll({ where: args });
    },
    project(_, args) {
      const {id} = args;
      return Project.findById(id);
    }
  },
  Mutation: {
    projectCreate(_, args) {
      return Project.create({ ...args });
    }
  },
  Project: {
    workItems(project) {
      return project.getWorkItems();
    }
  }
};
