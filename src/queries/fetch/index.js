import gql from 'graphql-tag';
import Status from 'constants/status';

const projectsAll = gql`
  query projectsAll {
    projects {
      id
      name
      type
      primaryColour
    }
  }
`;

const projectInformation = gql`
  query projectInformation($id: Int) {
    project(id: $id) {
      id
      name
      type
      primaryColour
    }
  }
`;

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

const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    ${createWorkItemListForEachStatus()}
  }
`;

const workItemsTodo = gql`
  query workItems($projectId: Int) {
    ${workItemTemplate('Todo')}
  }
`;

export default {
  projectsAll,
  projectInformation,
  projectWorkItems,
  workItemsTodo
};
