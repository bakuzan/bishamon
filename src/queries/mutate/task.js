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
