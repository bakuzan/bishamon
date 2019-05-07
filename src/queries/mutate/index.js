import * as ProjectMutations from './project';
import * as WorkItemMutations from './workItem';
import * as TaskMutations from './task';
import * as TechnologyMutations from './technology';

export default {
  ...ProjectMutations,
  ...WorkItemMutations,
  ...TaskMutations,
  ...TechnologyMutations
};
