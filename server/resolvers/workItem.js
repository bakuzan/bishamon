const Op = require('sequelize').Op;

const { ItemStatus, DoneStatuses } = require('../constants/enums');
const Utils = require('../utils');

module.exports = {
  taskRatio(workItem) {
    const oneWeekAgo = Utils.getDateXDaysFromToday(-7);

    return workItem
      .getTasks({
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
      .then((tasks) => {
        const total = tasks.length;
        const onHold = tasks.filter((t) => t.status === ItemStatus.OnHold)
          .length;
        const done = tasks.filter((t) => DoneStatuses.includes(t.status))
          .length;

        if (!total) {
          return 'N/A';
        }

        return `${done}/${total}(${onHold})`;
      });
  },
  tasks(workItem) {
    return workItem.getTasks();
  },
  project(inst) {
    if (inst.project) {
      return inst.project;
    }

    return inst.getProject();
  }
};
