const Op = require('sequelize').Op;

const Constants = require('../constants/index');
const { ItemStatus, DoneStatuses } = require('../constants/enums');
const Utils = require('../utils');

module.exports = {
  colours(project, args) {
    const { colours } = project.dataValues;
    const limit = args.limit || undefined;
    if (!colours) return [];
    return colours.split(',').slice(0, limit);
  },
  primaryColour(project) {
    const { colours } = project.dataValues;
    return colours.split(',')[0] || Constants.fallbackColour;
  },
  workItemRatio(project) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);

    return project
      .getWorkItems({
        where: {
          [Op.and]: [
            { status: { [Op.ne]: ItemStatus.Removed } },
            {
              [Op.or]: [
                { status: { [Op.ne]: ItemStatus.Done } },
                { updatedAt: { [Op.gt]: oneWeekAgo } }
              ]
            }
          ]
        }
      })
      .then(items => {
        const total = items.length;
        const onHold = items.filter(t => t.status === ItemStatus.OnHold).length;
        const done = items.filter(t => DoneStatuses.includes(t.status)).length;
        if (!total) return 'N/A';
        return `${done}/${total}(${onHold})`;
      });
  },
  workItems(project, args) {
    return project.getWorkItems();
  },
  workItem(project, args) {
    return project
      .getWorkItems({ where: { id: args.workItemId } })
      .then(items => items[0]);
  },
  updatedAt(project) {
    return Utils.formatDateISO(project.updatedAt);
  }
};
