const { Project } = require('./connectors');

module.exports = {
  Query: {
    projects(_, args) {
      return Project.findAll({ where: args })
    },
    project(_, args) {
      const {id} = args;
      return Project.findById(id);
    }
  },
  Project: {
    workItems(project) {
      return project.getWorkItems();
    }
  }
};
