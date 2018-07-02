import gql from 'graphql-tag';

export const projectsAll = gql`
  query projectsAll {
    projects {
      id
      name
      type
      primaryColour
      workItemRatio
      technologies {
        id
        name
      }
    }
  }
`;

export const projectInformation = gql`
  query projectInformation($id: Int) {
    project(id: $id) {
      id
      name
      type
      primaryColour
    }
  }
`;

export const projectById = gql`
  query projectById($id: Int) {
    project(id: $id) {
      id
      name
      type
      colours
      technologies {
        id
        name
      }
    }
  }
`;

export const projectRefreshOnWorkItemMutation = gql`
  query projectRefreshOnWorkItemMutation($id: Int) {
    project(id: $id) {
      id
      workItemRatio
    }
  }
`;
