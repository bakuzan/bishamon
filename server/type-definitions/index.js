const enums = require('./enums');
const query = require('./query');
const project = require('./project');
const workItem = require('./work-item');
const task = require('./task');

module.exports = `
  ${enums}
  ${query}
  ${project}
  ${workItem}
  ${task}
`;
