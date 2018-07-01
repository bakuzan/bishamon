import * as ProjectQueries from './project';
import * as WorkItemQueries from './work-item';
import * as TaskQueries from './task';
import * as TechnologiesQueries from './technology';

export default {
  ...ProjectQueries,
  ...WorkItemQueries,
  ...TaskQueries,
  ...TechnologiesQueries
};
