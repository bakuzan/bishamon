const Op = require('sequelize').Op;

const { Project, WorkItem, Task } = require('../connectors');
const { Audit } = require('../connectors/audit');
const { FinishedStatus } = require('../constants/enums');
const Utils = require('../utils');

module.exports = {
  projects(_, args) {
    return Project.findAll({ where: args, order: [['name', 'ASC']] });
  },
  project(_, args) {
    const { id } = args;
    return Project.findById(id);
  },
  workItems(_, { statusIn, ...args }) {
    const optionalArgs = !statusIn ? {} : { status: { [Op.or]: statusIn } };
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return WorkItem.findAll({
      where: {
        ...args,
        ...optionalArgs,
        [Op.or]: [
          { status: { [Op.ne]: FinishedStatus } },
          { updatedAt: { [Op.gt]: oneWeekAgo } }
        ]
      }
    });
  },
  workItemsHistoric(_, args) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return WorkItem.findAll({
      where: {
        ...args,
        status: FinishedStatus,
        updatedAt: { [Op.lt]: oneWeekAgo }
      }
    });
  },
  workItem(_, args) {
    const { id } = args;
    return WorkItem.findById(id);
  },
  tasks(_, args) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return Task.findAll({
      where: {
        ...args,
        [Op.or]: [
          { status: { [Op.ne]: FinishedStatus } },
          { updatedAt: { [Op.gt]: oneWeekAgo } }
        ]
      }
    });
  },
  tasksHistoric(_, args) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return Task.findAll({
      where: {
        ...args,
        status: FinishedStatus,
        updatedAt: { [Op.lt]: oneWeekAgo }
      }
    });
  },
  task(_, args) {
    const { id } = args;
    return Task.findById(id);
  },
  audits(_, args) {
    return Audit.findAll({ where: args });
  }
};