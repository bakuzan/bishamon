import * as ProjectQueries from './project';
import * as WorkItemQueries from './workItem';
import * as TaskQueries from './task';
import * as TechnologiesQueries from './technology';
import * as DashboardQueries from './dashboard';

export default {
  ...ProjectQueries,
  ...WorkItemQueries,
  ...TaskQueries,
  ...TechnologiesQueries,
  ...DashboardQueries
};
