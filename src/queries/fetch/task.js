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

export const taskById = gql`
  query taskById($id: Int) {
    task(id: $id) {
      id
      name
      description
      status
    }
  }
`;
