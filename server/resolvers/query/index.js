const Op = require('sequelize').Op;
const { Technology, Project, WorkItem } = require('../../connectors');
const { Audit } = require('../../connectors/audit');

const { ItemStatus } = require('../../constants/enums');
const projectQuery = require('./project');
const workItemQuery = require('./workItem');
const taskQuery = require('./task');
const noteQuery = require('./note');

module.exports = {
  ...projectQuery,
  ...workItemQuery,
  ...taskQuery,
  ...noteQuery,
  technologies(_, { sort, ...args }) {
    const order = !sort
      ? ['name', 'ASC']
      : sort.split('_').map((s, i) => (i === 0 ? s.toLowerCase() : s));

    return Technology.findAll({ where: { ...args }, order: [order] });
  },
  async dashboard() {
    const dashboardCurrentWork = await WorkItem.findAll({
      where: {
        status: { [Op.in]: [ItemStatus.Todo, ItemStatus.InProgress] }
      },
      order: [['createdAt', 'ASC']],
      include: [Project]
    });

    return {
      dashboardCurrentWork
    };
  },
  // Audit db
  audits(_, args) {
    return Audit.findAll({ where: args });
  }
};
