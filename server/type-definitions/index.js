const enums = require('./enums');
const customObjects = require('./customObjects');
const query = require('./query');
const project = require('./project');
const workItem = require('./workItem');
const task = require('./task');
const audit = require('./audit');
const technology = require('./technology');
const note = require('./note');

module.exports = [
  ...enums,
  ...query,
  ...technology,
  project,
  workItem,
  task,
  note,
  customObjects,
  audit
];
