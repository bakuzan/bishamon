const { Technology } = require('../../connectors');
const { Audit } = require('../../connectors/audit');

const projectQuery = require('./project');
const workItemQuery = require('./work-item');
const taskQuery = require('./task');

module.exports = {
  ...projectQuery,
  ...workItemQuery,
  ...taskQuery,
  technologies(_, { sort, ...args }) {
    const order = !sort
      ? ['name', 'ASC']
      : sort.split('_').map((s, i) => (i === 0 ? s.toLowerCase() : s));

    return Technology.findAll({ where: { ...args }, order: [order] });
  },
  // Audit db
  audits(_, args) {
    return Audit.findAll({ where: args });
  }
};
