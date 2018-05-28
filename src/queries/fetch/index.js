import * as ProjectQueries from './project';
import * as WorkItemQueries from './work-item';
import * as TaskQueries from './task';

export default {
  ...ProjectQueries,
  ...WorkItemQueries,
  ...TaskQueries
};
