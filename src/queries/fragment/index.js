import gql from 'graphql-tag';

const workItemStatus = gql`
  fragment workItemStatus on WorkItem {
    status
    __typename
  }
`;

export default {
  workItemStatus
};
