const { Project, Technology } = require('../../connectors');

module.exports = {
  projects(_, args) {
    return Project.findAll(
      { where: args, order: [['name', 'ASC']] },
      { include: [{ model: Technology }] }
    );
  },
  project(_, args) {
    const { id } = args;
    return Project.findByPk(id, { include: [{ model: Technology }] });
  }
};
