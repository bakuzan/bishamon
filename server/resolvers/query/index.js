const Op = require('sequelize').Op;
const { db, Technology, Project, WorkItem } = require('../../connectors');
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
  async technologies(_, { sort, ...args }) {
    const order = !sort
      ? ['name', 'ASC']
      : sort.split('_').map((s, i) => (i === 0 ? s.toLowerCase() : s));

    return await Technology.findAll({ where: { ...args }, order: [order] });
  },
  async dashboard() {
    const dashboardCurrentWork = await WorkItem.findAll({
      where: {
        status: {
          [Op.in]: [ItemStatus.Todo, ItemStatus.InProgress, ItemStatus.OnHold]
        },
        isActive: db.where(db.col('project.isActive'), {
          [Op.eq]: true
        })
      },
      order: [['createdAt', 'ASC']],
      include: [Project]
    });

    return {
      dashboardCurrentWork
    };
  },
  // Audit db
  async audits(_, args) {
    return await Audit.findAll({ where: args });
  }
};
