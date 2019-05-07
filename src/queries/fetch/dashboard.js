import gql from 'graphql-tag';

import { workItemFields } from '../fragment/workItem';

export const getDashboard = gql`
  query Dashboard {
    dashboard {
      dashboardCurrentWork {
        ...WorkItemFields
        taskRatio
        project {
          name
        }
      }
    }
  }
  ${workItemFields}
`;
