const Op = require('sequelize').Op;

const { Task } = require('../../connectors');

const { ItemStatus } = require('../../constants/enums');
const Utils = require('../../utils');

module.exports = {
  tasks(_, args) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);
    return Task.findAll({
      where: {
        ...args,
        [Op.or]: [
          { status: { [Op.ne]: ItemStatus.Done } },
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
        status: ItemStatus.Done,
        updatedAt: { [Op.lt]: oneWeekAgo }
      }
    });
  },
  task(_, args) {
    const { id } = args;
    return Task.findByPk(id);
  }
};
