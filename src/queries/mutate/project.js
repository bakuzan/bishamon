import gql from 'graphql-tag';

export const projectCreate = gql`
  mutation projectCreate(
    $name: String!
    $type: ProjectType
    $colours: [String]
  ) {
    projectCreate(name: $name, type: $type, colours: $colours) {
      id
      name
    }
  }
`;

export const projectUpdate = gql`
  mutation projectUpdate(
    $id: Int!
    $name: String
    $type: ProjectType
    $colours: [String]
  ) {
    projectUpdate(id: $id, name: $name, type: $type, colours: $colours) {
      id
      name
      type
      colours
    }
  }
`;
