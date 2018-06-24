const Op = require('sequelize').Op;

const { ItemStatus, DoneStatuses } = require('../constants/enums');

module.exports = {
  taskRatio(workItem) {
    return workItem
      .getTasks({ where: { status: { [Op.ne]: ItemStatus.Removed } } })
      .then(tasks => {
        const total = tasks.length;
        const onHold = tasks.filter(t => t.status === ItemStatus.OnHold).length;
        const done = tasks.filter(t => DoneStatuses.includes(t.status)).length;
        if (!total) return 'N/A';
        return `${done}/${total}(${onHold})`;
      });
  },
  tasks(workItem) {
    return workItem.getTasks();
  }
};
