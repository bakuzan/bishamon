import gql from 'graphql-tag';

export const taskStatus = gql`
  fragment taskStatus on Task {
    status
    __typename
  }
`;
