const Op = require('sequelize').Op;

const { ItemStatus } = require('../constants/enums');
const Utils = require('./index');

function buildHistoricQueryParams(args) {
  const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
  return {
    where: {
      ...args,
      status: ItemStatus.Done,
      updatedAt: { [Op.lt]: oneWeekAgo }
    }
  };
}

function buildOnHoldQueryParams(args) {
  return {
    where: {
      ...args,
      status: ItemStatus.OnHold
    }
  };
}

module.exports = {
  buildOnHoldQueryParams,
  buildHistoricQueryParams
};
