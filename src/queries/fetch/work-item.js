import gql from 'graphql-tag';

import Status from 'constants/status';

const workItemTemplate = status => `
  workItems(projectId: $projectId, status: ${status}) {
    id
    name
    description
    type
    status
    taskRatio
  }
`;

function createWorkItemListForEachStatus() {
  return Status.reduce((p, status) => {
    return `
      ${p}
      ${status}: ${workItemTemplate(status)}
    `;
  }, '');
}

export const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    ${createWorkItemListForEachStatus()}
  }
`;

export const workItemsTodo = gql`
  query workItems($projectId: Int) {
    ${workItemTemplate('Todo')}
  }
`;

export const workItemInformation = gql`
  query workItemInformation($id: Int) {
    workItem(id: $id) {
      id
      name
      type
      status
    }
  }
`;

export const workItemById = gql`
  query workItemById($id: Int) {
    workItem(id: $id) {
      id
      name
      description
      type
      status
    }
  }
`;
