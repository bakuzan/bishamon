const projectMutate = require('./project');
const workItemMutate = require('./work-item');
const taskMutate = require('./task');
const technologyMutate = require('./technology');

module.exports = {
  ...projectMutate,
  ...workItemMutate,
  ...taskMutate,
  ...technologyMutate
};
