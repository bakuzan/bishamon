import gql from 'graphql-tag';

export const getNotes = gql`
  query Notes {
    notes {
      id
      text
    }
  }
`;
