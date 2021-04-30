const { Project, Technology } = require('../../connectors');

const Utils = require('../../utils');

module.exports = {
  projectCreate(_, { technologies, ...args }) {
    return Project.create({ ...args, isActive: true }).then((project) =>
      project
        .setTechnologies(Utils.mapObjectListToIdList(technologies))
        .then(() => project.reload({ includes: [{ model: Technology }] }))
    );
  },
  projectUpdate(_, { id, technologies, ...args }) {
    return Project.update(
      { ...args },
      { where: { id }, individualHooks: true }
    ).then(() =>
      Project.findByPk(id).then((project) =>
        project
          .setTechnologies(Utils.mapObjectListToIdList(technologies))
          .then(() => project.reload({ includes: [{ model: Technology }] }))
      )
    );
  }
};
