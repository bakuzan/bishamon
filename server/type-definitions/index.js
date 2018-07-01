const enums = require('./enums');
const customObjects = require('./custom-objects');
const query = require('./query');
const project = require('./project');
const workItem = require('./work-item');
const task = require('./task');
const audit = require('./audit');
const technology = require('./technology');

module.exports = [
  ...enums,
  ...customObjects,
  ...query,
  project,
  workItem,
  task,
  technology,
  audit
];
