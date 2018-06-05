import gql from 'graphql-tag';

export const workItemStatus = gql`
  fragment workItemStatus on WorkItem {
    status
    __typename
  }
`;

export const workItemTaskRatio = gql`
  fragment workItemTaskRatio on WorkItem {
    taskRatio
    __typename
  }
`;

export const workItemUpdateBasedOnTasks = gql`
  fragment workItemUpdateBasedOnTasks on WorkItem {
    status
    taskRatio
    __typename
  }
`;
