import gql from 'graphql-tag';

const workItemStatus = gql`
  fragment workItemStatus on WorkItem {
    status
    __typename
  }
`;

const taskStatus = gql`
  fragment taskStatus on Task {
    status
    __typename
  }
`;

export default {
  workItemStatus,
  taskStatus
};
