import gql from 'graphql-tag';

export const projectsAll = gql`
  query projectsAll {
    projects {
      id
      name
      type
      primaryColour
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