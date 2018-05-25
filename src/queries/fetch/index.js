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

function createWorkItemListForEachStatus() {
  return Status.reduce((p, status) => {
    return `
      ${p}
      ${status}: workItems(projectId: $projectId, status: ${status}) {
        id
        name
        description
        type
        status
        taskRatio
      }
    `;
  }, '');
}

const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    ${createWorkItemListForEachStatus()}
  }
`;

export default {
  projectsAll,
  projectInformation,
  projectWorkItems
};
