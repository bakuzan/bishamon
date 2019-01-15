import gql from 'graphql-tag';

const fields = gql`
  fragment TaskFields on Task {
    id
    name
    description
    status
  }
`;

export const workItemTasks = gql`
  query workItemTasks($workItemId: Int) {
    tasks(workItemId: $workItemId) {
      ...TaskFields
    }
    tasksOnHoldCount(workItemId: $workItemId)
    tasksHistoricCount(workItemId: $workItemId)
  }
  ${fields}
`;

export const workItemTasksOnHold = gql`
  query workItemTasksOnHold($workItemId: Int) {
    tasksOnHold(workItemId: $workItemId) {
      ...TaskFields
    }
  }
  ${fields}
`;

export const workItemTasksHistoric = gql`
  query workItemTasksHistoric($workItemId: Int) {
    tasksHistoric(workItemId: $workItemId) {
      ...TaskFields
    }
  }
  ${fields}
`;

export const taskById = gql`
  query taskById($id: Int) {
    task(id: $id) {
      ...TaskFields
    }
  }
  ${fields}
`;
