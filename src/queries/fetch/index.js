import * as ProjectQueries from './project';
import * as WorkItemQueries from './workItem';
import * as TaskQueries from './task';
import * as TechnologiesQueries from './technology';
import * as DashboardQueries from './dashboard';
import * as NoteQueries from './note';

export default {
  ...ProjectQueries,
  ...WorkItemQueries,
  ...TaskQueries,
  ...TechnologiesQueries,
  ...DashboardQueries,
  ...NoteQueries
};
