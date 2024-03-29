import gql from 'graphql-tag';

export const projectCreate = gql`
  mutation projectCreate(
    $name: String!
    $type: ProjectType
    $colours: [String]
    $technologies: [TechnologyInput]
  ) {
    projectCreate(
      name: $name
      type: $type
      colours: $colours
      technologies: $technologies
    ) {
      id
      name
      type
      primaryColour
      technologies {
        id
        name
      }
    }
  }
`;

export const projectUpdate = gql`
  mutation projectUpdate(
    $id: Int!
    $name: String
    $type: ProjectType
    $colours: [String]
    $technologies: [TechnologyInput]
    $isActive: Boolean
  ) {
    projectUpdate(
      id: $id
      name: $name
      type: $type
      colours: $colours
      technologies: $technologies
      isActive: $isActive
    ) {
      id
      name
      type
      primaryColour
      isActive
      technologies {
        id
        name
      }
    }
  }
`;
