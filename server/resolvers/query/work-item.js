const Op = require('sequelize').Op;

const { WorkItem } = require('../../connectors');

const { ItemStatus } = require('../../constants/enums');
const Utils = require('../../utils');

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
  workItemsHistoric(_, args) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return WorkItem.findAll({
      where: {
        ...args,
        status: ItemStatus.Done,
        updatedAt: { [Op.lt]: oneWeekAgo }
      }
    });
  },
  workItem(_, args) {
    const { id } = args;
    return WorkItem.findByPk(id);
  }
};
