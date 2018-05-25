import gql from 'graphql-tag';

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

export default {
  projectsAll
};
