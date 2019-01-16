const Op = require('sequelize').Op;

const { Task } = require('../../connectors');

const { ItemStatus } = require('../../constants/enums');
const Utils = require('../../utils');
const {
  buildHistoricQueryParams,
  buildOnHoldQueryParams
} = require('../../utils/query-builders');

module.exports = {
  tasks(_, { statusIn, ...args }) {
    const optionalArgs = !statusIn ? {} : { status: { [Op.or]: statusIn } };
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return Task.findAll({
      where: {
        ...args,
        ...optionalArgs,
        [Op.or]: [
          { status: { [Op.ne]: ItemStatus.Done } },
          { updatedAt: { [Op.gt]: oneWeekAgo } }
        ]
      }
    });
  },
  tasksOnHoldCount(_, args) {
    const queryParams = buildOnHoldQueryParams(args);
    return Task.count(queryParams);
  },
  tasksOnHold(_, args) {
    const queryParams = buildOnHoldQueryParams(args);
    return Task.findAll(queryParams);
  },
  tasksHistoricCount(_, args) {
    const queryParams = buildHistoricQueryParams(args);
    return Task.count(queryParams);
  },
  tasksHistoric(_, args) {
    const queryParams = buildHistoricQueryParams(args);
    return Task.findAll(queryParams);
  },
  task(_, args) {
    const { id } = args;
    return Task.findByPk(id);
  }
};
