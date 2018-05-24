import gql from 'graphql-tag';

const projectCreate = gql`
  mutation projectCreate($name: String!, $type: ProjectType, $colours: [String]) {
    projectCreate(name: $name, type: $type, colours: $colours) {
      id
      name
    }
  }
`;

export default {
  projectCreate
}
