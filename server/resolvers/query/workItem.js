const Op = require('sequelize').Op;

const { WorkItem } = require('../../connectors');

const { ItemStatus } = require('../../constants/enums');
const Utils = require('../../utils');
const {
  buildHistoricQueryParams,
  buildOnHoldQueryParams
} = require('../../utils/queryBuilders');

module.exports = {
  workItems(_, { statusIn, ...args }) {
    const optionalArgs = !statusIn ? {} : { status: { [Op.or]: statusIn } };
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return WorkItem.findAll({
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
  workItemsOnHoldCount(_, args) {
    const queryParams = buildOnHoldQueryParams(args);
    return WorkItem.count(queryParams);
  },
  workItemsOnHold(_, args) {
    const queryParams = buildOnHoldQueryParams(args);
    return WorkItem.findAll(queryParams);
  },
  workItemsHistoricCount(_, args) {
    const queryParams = buildHistoricQueryParams(args);
    return WorkItem.count(queryParams);
  },
  workItemsHistoric(_, args) {
    const queryParams = buildHistoricQueryParams(args);
    return WorkItem.findAll(queryParams);
  },
  workItem(_, args) {
    const { id } = args;
    return WorkItem.findByPk(id);
  }
};
