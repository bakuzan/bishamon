import * as ProjectMutations from './project';
import * as WorkItemMutations from './work-item';
import * as TaskMutations from './task';

export default {
  ...ProjectMutations,
  ...WorkItemMutations,
  ...TaskMutations
};
