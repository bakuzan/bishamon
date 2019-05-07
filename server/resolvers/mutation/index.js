const projectMutate = require('./project');
const workItemMutate = require('./workItem');
const taskMutate = require('./task');
const technologyMutate = require('./technology');

module.exports = {
  ...projectMutate,
  ...workItemMutate,
  ...taskMutate,
  ...technologyMutate
};
