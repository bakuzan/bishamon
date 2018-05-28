import gql from 'graphql-tag';

import Status from 'constants/status';

const taskTemplate = status => `
  tasks(workItemId: $workItemId, status: ${status}) {
    id
    name
    description
    status
  }
`;

function createTaskListForEachStatus() {
  return Status.reduce((p, status) => {
    return `
      ${p}
      ${status}: ${taskTemplate(status)}
    `;
  }, '');
}

export const workItemTasks = gql`
  query workItemTasks($workItemId: Int) {
    ${createTaskListForEachStatus()}
  }
`;

export const tasksTodo = gql`
  query tasks($workItemId: Int) {
    ${taskTemplate('Todo')}
  }
`;
