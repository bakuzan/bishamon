import gql from 'graphql-tag';

export const workItemTasks = gql`
  query workItemTasks($workItemId: Int) {
    tasks(workItemId: $workItemId) {
      id
      name
      description
      status
    }
  }
`;
