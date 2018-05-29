import gql from 'graphql-tag';

export const projectWorkItems = gql`
  query projectWorkItems($projectId: Int) {
    workItems(projectId: $projectId) {
      id
      name
      description
      type
      status
      taskRatio
    }
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
