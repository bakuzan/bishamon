const query = require('./query');
const project = require('./project');
const workItem = require('./work-item');

module.exports = `
  ${query}
  ${project}
  ${workItem}
`;
