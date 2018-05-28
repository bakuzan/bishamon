import gql from 'graphql-tag';

export const workItemCreate = gql`
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
