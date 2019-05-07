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

export const workItemStatusUpdate = gql`
  mutation workItemStatusUpdate($id: Int!, $status: Status) {
    workItemUpdate(id: $id, status: $status) {
      id
      name
      description
      type
      status
      taskRatio
      projectId
    }
  }
`;

export const workItemUpdate = gql`
  mutation workItemUpdate(
    $id: Int!
    $name: String
    $description: String
    $type: WorkType
    $status: Status
    $cause: String
  ) {
    workItemUpdate(
      id: $id
      name: $name
      description: $description
      type: $type
      status: $status
      cause: $cause
    ) {
      id
      name
      description
      type
      status
      cause
      projectId
    }
  }
`;
