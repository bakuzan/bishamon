import gql from 'graphql-tag';

export const taskCreate = gql`
  mutation taskCreate($workItemId: Int!, $name: String!, $description: String) {
    taskCreate(
      workItemId: $workItemId
      name: $name
      description: $description
    ) {
      id
      name
      description
      status
    }
  }
`;

export const taskStatusUpdate = gql`
  mutation taskStatusUpdate($id: Int!, $status: Status) {
    taskUpdate(id: $id, status: $status) {
      id
      name
      description
      status
      workItemId
    }
  }
`;

export const taskUpdate = gql`
  mutation taskUpdate(
    $id: Int!
    $name: String
    $description: String
    $status: Status
  ) {
    taskUpdate(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      workItemId
    }
  }
`;
