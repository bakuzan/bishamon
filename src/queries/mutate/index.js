import gql from 'graphql-tag';

const projectCreate = gql`
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

const workItemCreate = gql`
  mutation workItemCreate(
    $projectId: Int!
    $name: String!
    $type: WorkType
    $description: String
  ) {
    workItemCreate(
      projectId: $projectId
      name: $name
      description: $description
      type: $type
    ) {
      id
      name
      description
      type
      status
    }
  }
`;

export default {
  projectCreate,
  workItemCreate
};
