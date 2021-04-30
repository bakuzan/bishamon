const { Project, Technology } = require('../../connectors');

module.exports = {
  projects(_, { sorting = {} }) {
    const field = sorting.field || 'name';
    const direction = sorting.direction || 'ASC';

    return Project.findAll(
      { where: { isActive: true }, order: [[field, direction]] },
      { include: [{ model: Technology }] }
    );
  },
  project(_, args) {
    const { id } = args;
    return Project.findByPk(id, { include: [{ model: Technology }] });
  }
};
