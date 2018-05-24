import gql from 'graphql-tag';

const projectsAll = gql`
  query projectsAll {
    projects {
      id
      name
    }
  }
`;

export default {
  projectsAll
}
